"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, WorkOrder, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from api.decorators import admin_required
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
from datetime import datetime, timedelta, timezone

# #######################################################################
import cloudinary.uploader as uploader
# #######################################################################


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# user routes
@api.route('/user/login', methods=['POST'])
def handle_user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "No email or password"}), 400
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"msg": "no such user"}), 404
    if user.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(
        identity=user.id,
        additional_claims = {"role": "owner"} 
        )
    return jsonify(access_token=access_token), 201


# customer routes

@api.route('/customer/signup', methods=['POST'])
def handle_customer_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    address = request.json.get("address", None)
    phone = request.json.get("phone", None)
    if email is None or password is None or first_name is None or last_name is None or address is None or phone is None:
        return jsonify({"msg": "Some fields are missing in your request"}), 400
    customer = Customer.query.filter_by(email=email).one_or_none()
    if customer:
        return jsonify({"msg": "An account associated with the email already exists"}), 409
    customer = Customer(email=email, password=password, first_name=first_name, last_name=last_name, address=address, phone=phone, is_active=True)
    db.session.add(customer)
    db.session.commit()
    db.session.refresh(customer)
    response_body = {"msg": "Account succesfully created!", "customer":customer.serialize()}
    return jsonify(response_body), 201

@api.route('/customer/login', methods=['POST'])
def handle_customer_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "No email or password"}), 400
    customer = Customer.query.filter_by(email=email).one_or_none()
    if customer is None:
        return jsonify({"msg": "no such user"}), 404
    if customer.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=customer.id, additional_claims={"role": "customer"})

    return jsonify(access_token=access_token, customer_id=customer.id), 201

@api.route('/customer/edit/<int:cust_id>', methods=['PUT'])
@admin_required()
def handle_customer_edit(cust_id):
    email = request.json.get("email")
    password = request.json.get("password")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    address = request.json.get("address")
    phone = request.json.get("phone")
    if email is None or password is None or first_name is None or last_name is None or address is None or phone is None:
        return jsonify({"msg": "Some fields are missing in your request"}), 400
    customer = Customer.query.filter_by(id=get_jwt_identity()).one_or_none()
    if customer is None:
        return jsonify({"msg": "No customer found"}), 404
    customer.email=email
    customer.password=password    
    customer.first_name=first_name   
    customer.last_name=last_name    
    customer.address=address    
    customer.phone=phone
    db.session.commit()
    db.session.refresh(customer)
    response_body = {"msg": "Account succesfully edited!", "customer":customer.serialize()}
    return jsonify(response_body), 201

@api.route('/customer/edit-by-customer', methods=['PUT'])
@jwt_required()
def handle_customer_edit_by_customer():
    email = request.json.get("email")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    address = request.json.get("address")
    phone = request.json.get("phone")
    
    if email is None or first_name is None or last_name is None or address is None or phone is None:
        return jsonify({"msg": "Some fields are missing in your request"}), 400
   
    customer = Customer.query.filter_by(id=get_jwt_identity()).first()
    if customer is None:
        return jsonify({"msg": "No customer found"}), 404
    
    customer.email=email 
    customer.first_name=first_name   
    customer.last_name=last_name    
    customer.address=address    
    customer.phone=phone
    db.session.commit()
    db.session.refresh(customer)
    
    response_body = {"msg": "Account succesfully edited!", "customer":customer.serialize()}
    return jsonify(response_body), 201

@api.route('/customer/delete/<int:cust_id>', methods =['DELETE'])
@admin_required()
def delete(cust_id):
    user = User.query.filter_by(id=get_jwt_identity()).first()
    if user is None:
        return ({"msg":"This feature is only available to authorized staff"}), 401
    customer = Customer.query.get(cust_id)

    if customer is None:
        return jsonify({"msg": "This customer does not exist" }), 404
    
    db.session.delete(customer)
    db.session.commit()

    return jsonify({"msg": "Customer successfully deleted"}), 200



@api.route('/user/get-customer/<int:cust_id>', methods=['GET'])
@admin_required()
def get_customer(cust_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    customer = Customer.query.get(cust_id)
    if customer is None:
        return jsonify({"msg": "No customer found"}), 404
    
    return jsonify(customer.serialize()), 200

@api.route('/current-customer', methods=['GET'])
@jwt_required()
def get_current_customer():
    
    customer = Customer.query.get(get_jwt_identity())
    if customer is None:
        return jsonify({"msg": "No customer found"}), 404
    
    return jsonify(customer.serialize()), 200
@api.route('/customers', methods=['GET'])
@jwt_required()
def get_all_customers():
    if not User.query.get(get_jwt_identity()).is_admin():
        return jsonify({"msg": "Access forbidden"}), 403

    customers = Customer.query.all()
    return jsonify([customer.serialize() for customer in customers]), 200

@api.route('/send-verification-code', methods=['POST'])
def send_verification_code():
    email= request.json.get('email')
    if not email:
        return jsonify({'msg': 'Missing email'}), 400

    verification_code = ''.join([str(random.randint(0,9)) for _ in range(6)])
    expiration = datetime.datetime.now(timezone.utc) + datetime.timedelta(minutes=10)
    customer = Customer.query.filter_by(email=email).one_or_none()
    if customer:
        customer.verification_code= verification_code
        customer.verification_code_expires = expiration
        db.session.commit()

    else:
        return jsonify({'mes': 'Email not found'}), 404
    
    message = Mail (
        from_email='pimpmyride879@gmail.com',
        to_emails=email,
        subject='Your Verification Code',
        html_content=f'Your verification code is: {verification_code}'
    )
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        return jsonify({'msg': 'Email send successfully!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'msg': 'Failed to send email'}), 500
    
@api.route('/customer-verify', methods=['POST'])
def verify_customer():
    email = request.json.get('email')
    submitted_code = request.json.get('verificationCode')
    customer = Customer.query.filter_by(email=email).one_or_none()
    if not customer:
        return jsonify({'msg': 'Email is not found'}), 404
    if datetime.datetime.now(timezone.utc) > customer.verification_code_expires:
        return jsonify({'msg': 'Verification code has expired'}), 410
    if customer.verification_code == submitted_code:
        return jsonify({'msg': 'Verification successful'}), 200
    else:
        return jsonify({'msg': 'Invalid verification code'}), 400



@api.route('/work_orders/customer/<int:cust_id>', methods=['GET'])
@jwt_required()
def get_work_orders_by_customer(cust_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != "admin" and current_user.id != cust_id:
        return jsonify({"msg": "Access forbidden"}), 403

    customer = Customer.query.filter_by(id=cust_id).first()
    if not customer:
        return jsonify({"msg": "Customer not found"}), 404

    work_orders = [wo.serialize() for wo in customer.work_orders]
    return jsonify(work_orders)
# work order routes
@api.route('/work-order/new', methods=['POST'])
@admin_required()
def create_work_order():
    def is_list_valid(a):
        canon=["Car accepted",
        "Supplement sent to insurance",
        "Supplement approved",
        "Check received from Insurance",
        "Parts Ordered",
        "Parts Delivered",
        "Labor in Progress",
        "Labor completed, car is being prepared for pick-up",
        "Car is ready for pick-up",
        "Completed"]
        if type(a) is not list:
            return False
        for x in a:
            if x not in canon:
                return False
        return True
    user_id = get_jwt_identity()
    customer_id = request.json.get("customer_id", None)
    wo_stages = request.json.get("wo_stages", None)
    make = request.json.get("make", None)
    model = request.json.get("model", None)
    color = request.json.get("color", None) 
    vin = request.json.get("vin", None) 
    license_plate  = request.json.get("license_plate", None) 
    comments = request.json.get("comments", None) 
    if user_id is None or customer_id is None or wo_stages is None or make is None or model is None or color is None or vin is None or license_plate  is None:
        return jsonify({"msg": "Some required fields are missing"}), 400
    if is_list_valid(wo_stages) is False:
        return jsonify({"msg": "Please send a valid list of stages"}), 400
    customer = Customer.query.filter_by(id=customer_id).one_or_none()
    if customer is None:
        return jsonify({"msg": "A customer with that id does not exist"}), 404
    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify({"msg": "A user with that id does not exist"}), 404
    work_order = WorkOrder (user_id=user_id, customer_id=customer_id, wo_stages=wo_stages, make=make, model=model, color=color, vin=vin, license_plate=license_plate)
    db.session.add(work_order)
    db.session.commit()   
    db.session.refresh(work_order)
    if comments: 
        comment = Comment (work_order_id=work_order.id, message=comments)
        db.session.add(comment)
        db.session.commit()
        db.session.refresh(work_order)

    response_body = {"msg": "Work Order succesfully created!", "work_order":work_order.serialize()}
    return jsonify(response_body), 201

@api.route('/work-order/edit/<int:work_order_id>', methods=['PUT'])
@admin_required()
def edit_work_order(work_order_id):
    data = request.json
    if not data:
        return jsonify({"msg": "No JSON data provided"}), 400
    wo_stages = data.get("wo_stages")
    make = data.get("make")
    model = data.get("model")
    color = data.get("color") 
    vin = data.get("vin") 
    license_plate  = data.get("license_plate")

    if None in (wo_stages, make, model, color, vin, license_plate):
        return jsonify({"msg": "Some required fields are missing"}), 400 

    work_order = WorkOrder.query.get(work_order_id)
    if work_order is None:
        return jsonify({"msg": "Work order not found"}), 404
    work_order.wo_stages = wo_stages
    work_order.make = make
    work_order.model = model
    work_order.color = color
    work_order.vin = vin
    work_order.license_plate = license_plate
    db.session.commit()
    db.session.refresh(work_order)
    return jsonify({"work_order": work_order.serialize()}), 200


@api.route('/work-order/all', methods=['GET'])
# @admin_required()
def get_all_work_orders():
    work_orders = WorkOrder.query.all()
    serialized_work_orders = [wo.serialize() for wo in work_orders]
    return jsonify({"work_orders": serialized_work_orders}), 200

@api.route('/work-order/<int:work_order_id>', methods=['GET'])
@admin_required()
def get_work_order(work_order_id):
    work_order = WorkOrder.query.get(work_order_id)
    if work_order is None:
        return jsonify({"msg": "Work order not found"}), 404
    return jsonify({"work_order": work_order.serialize()}), 200

@api.route('/work-order/delete/<int:work_order_id>', methods =['DELETE'])
@admin_required()
def delete_work_order(work_order_id):
    work_order = WorkOrder.query.get(work_order_id)
    if work_order is None:
        return jsonify({"msg": "work order not found" }), 404
    db.session.delete(work_order)
    db.session.commit()
    return jsonify({"msg": "Work order successfully deleted"}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private_data():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    message = f"of these are all my recent secrets, I use {user.email} and have a {user.id}"
    return jsonify(message), 200
  

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
