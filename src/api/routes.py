"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Work_order, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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

    access_token = create_access_token(identity=user.id)
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
    if email is None or password is None:
        return jsonify({"msg": "No email or password"}), 400
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

    access_token = create_access_token(identity=customer.id)
    return jsonify(access_token=access_token), 201

@api.route('/customer/<int:cust_id>', methods=['GET'])
def get_customer(cust_id):
    customer = Customer.query.filter_by(id=cust_id).first()
    if customer is None:
        return jsonify({"msg": "No customer found"}), 404
    return jsonify({"customer":customer.serialize()}), 20


# work order routes
@api.route('/work-order/new', methods=['POST'])
def create_work_order():
    user_id = request.json.get("user_id", None)
    customer_id = request.json.get("customer_id", None)
    wo_status = request.json.get("wo_status", None)
    make = request.json.get("make", None)
    model = request.json.get("model", None)
    color = request.json.get("color", None) 
    vin = request.json.get("vin", None) 
    license_plate  = request.json.get("license_plate", None) 
    if user_id is None or customer_id is None or wo_status is None or make is None or model is None or color is None or vin is None or license_plate  is None:
        return jsonify({"msg": "Some required fields are missing"}), 400
    customer = Customer.query.filter_by(id=customer_id).one_or_none()
    if customer is None:
        return jsonify({"msg": "A customer with that id does not exist"}), 404
    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify({"msg": "A user with that id does not exist"}), 404
    
    
    work_order = Work_order (user_id=user_id, customer_id=customer_id, wo_status=wo_status, make=make, model=model, color=color, vin=vin, license_plate=license_plate)
    db.session.add(work_order)
    db.session.commit()
    db.session.refresh(work_order)
    response_body = {"msg": "Work Order succesfully created!", "work_order":work_order.serialize()}
    return jsonify(response_body), 201

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
