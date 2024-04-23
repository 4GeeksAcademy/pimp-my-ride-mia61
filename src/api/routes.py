"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, WorkOrder, Comment,WorkOrderImage
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt, decode_token
from api.decorators import admin_required
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random
from datetime import datetime, timedelta, timezone
import cloudinary.uploader as uploader
from cloudinary.api import delete_resources_by_tag
from sqlalchemy.exc import SQLAlchemyError
import uuid
from urllib.parse import quote
from email.message import EmailMessage
import ssl
import smtplib
from werkzeug.security import generate_password_hash
from .models import User
import json
import pytz


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
        return jsonify({"msg": "No such user"}), 404
    if customer.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=customer.id, additional_claims={"role": "customer"})

    return jsonify(access_token=access_token, customer_id=customer.id), 201

@api.route('/customer/edit/<int:cust_id>', methods=['PUT'])
@admin_required()
def handle_customer_edit(cust_id):
    email = request.json.get("email")
  
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    address = request.json.get("address")
    phone = request.json.get("phone")
    if email is None  or first_name is None or last_name is None or address is None or phone is None:
        return jsonify({"msg": "Some fields are missing in your request"}), 400
    customer = Customer.query.filter_by(id=cust_id).one_or_none()
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
# @admin_required()
def get_customer(cust_id):
    # current_user_id = get_jwt_identity()
    # current_user = User.query.get(current_user_id)

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
@admin_required()
def get_all_customers():
    customers = Customer.query.all()
    return jsonify([customer.serialize() for customer in customers]), 200

# @api.route('/send-verification-code', methods=['POST'])
# def send_verification_code():
#     email= request.json.get('email')
#     if not email:
#         return jsonify({'msg': 'Missing email'}), 400

#     verification_code = ''.join([str(random.randint(0,9)) for _ in range(6)])
#     expiration = datetime.datetime.now(timezone.utc) + datetime.timedelta(minutes=10)
#     customer = Customer.query.filter_by(email=email).one_or_none()
#     if customer:
#         customer.verification_code= verification_code
#         customer.verification_code_expires = expiration
#         db.session.commit()

#     else:
#         return jsonify({'mes': 'Email not found'}), 404
    
#     message = Mail (
#         from_email='pimpmyride879@gmail.com',
#         to_emails=email,
#         subject='Your Verification Code',
#         html_content=f'Your verification code is: {verification_code}'
#     )
#     try:
#         sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
#         response = sg.send(message)
#         return jsonify({'msg': 'Email send successfully!'}), 200
#     except Exception as e:
#         print(e)
#         return jsonify({'msg': 'Failed to send email'}), 500

@api.route('/send-verification-code', methods=['POST'])
def send_verification_code():
    data = request.get_json(silent=True)  
    if not data:
        return jsonify(msg="Invalid or no JSON payload"), 400

    license = data.get('license')
    if not license:
        return jsonify(msg="Missing license"), 400

    email = data.get('email')
    if not email:
        return jsonify(msg='Missing email'), 400

    verification_code = ''.join([str(random.randint(0,9)) for _ in range(6)])
    expiration = datetime.now(timezone.utc) + timedelta(minutes=10)

    try:
        customer = Customer.query.filter_by(email=email).one_or_none()
        if not customer:
            return jsonify(msg='Email not found'), 404

        work_order = WorkOrder.query.filter_by(customer_id=customer.id, license_plate=license).first()
        if not work_order:
            return jsonify(msg="Order not found"), 400

        customer.verification_code = verification_code
        customer.verification_code_expires = expiration
        db.session.commit()

        message = Mail(
            from_email='pimpmyride879@gmail.com',
            to_emails=email,
            subject='Your Verification Code',
            html_content=f'Your verification code is: {verification_code}'
        )
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        return jsonify(msg='Email sent successfully!'), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"Database error occurred: {str(e)}")
        return jsonify(msg='Database error, failed to process your request'), 500
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return jsonify(msg='Failed to send email'), 500

# utc=pytz.UTC
@api.route('/customer-verify', methods=['POST'])
def verify_customer():
    email = request.json.get('email')
    license= request.json.get('license')
    submitted_code = request.json.get('verificationCode')
    customer = Customer.query.filter_by(email=email).first()
    if not customer:
        return jsonify({'msg': 'Email is not found'}), 404
    current_time = datetime.now()

    if current_time > customer.verification_code_expires:
        return jsonify({'msg': 'Verification code has expired'}), 410
    if str(customer.verification_code) == submitted_code:
        access_token = create_access_token(
        identity=customer.id,
        additional_claims = {"role": "customer"} 
        )
        # expiration=timedelta(minutes=5)
        # access_token = create_access_token(identity=customer.id, additional_claims={"role": "customer", "license_plate": license}, expires_delta=expiration)
        work_order=WorkOrder.query.filter_by(license_plate=license).order_by(WorkOrder.id.desc()).first()
        return jsonify({'msg': 'success we found your order', "work_order_id": work_order.id, "access_token": access_token, "customer_id":customer.id }), 200
    return jsonify({'msg': 'Invalid verification code'}), 400


@api.route('/work_orders/customer/<int:license_plate>', methods=['GET'])
@jwt_required()
def get_work_orders_by_customer_and_license(license_plate):
    current_customer_id = get_jwt_identity()
    current_customer = Customer.query.get(current_customer_id)

    if not current_customer:
        return jsonify({"msg": "Customer not found"}), 404
    work_orders=WorkOrder.query.filter_by(customer_id=current_customer_id, license_plate=license_plate,).filter(WorkOrder.current_stage != "Completed").all()

    work_orders = [wo.serialize() for wo in work_orders]
    return jsonify(work_orders), 200


@api.route('/work_orders/customer/<int:cust_id>', methods=['GET'])
@admin_required()
def get_work_orders_by_customer_id(cust_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != "admin" and current_user.id != cust_id:
        return jsonify({"msg": "Access forbidden"}), 403

    customer = Customer.query.filter_by(id=cust_id).first()
    if not customer:
        return jsonify({"msg": "Customer not found"}), 404

    work_orders = [wo.serialize() for wo in customer.work_orders]
    return jsonify(work_orders)


@api.route('/forgotpassword', methods=['POST'])
def forgotpassword():
    try:
        # body = request.get_json()
        # email = body.get("email")
        # role = body.get("role")
        data = request.get_json()
        email = data.get("email")
        role = data.get("role")

        if not email:
            return jsonify({"message": "No email was provided"}), 400
        isCustomer = Customer.query.filter_by(email=email).first()
        if isCustomer:
            role = "customer"
            user = isCustomer
        isUser = User.query.filter_by(email=email).first()
        if isUser:
            role = "user"
            user = isUser

        if not user:
            return jsonify({"message": "User doesn't exist"}), 404

        # Generate a reset token
        reset_token = str(uuid.uuid4())
        user.reset_token = quote(reset_token)
        db.session.commit()

        expiration_time = datetime.utcnow() + timedelta(hours=1)
        payload = {
            'email': email,
            'exp': expiration_time.timestamp(),
            'role': role,
            'reset_token': quote(reset_token)
        }
        access_token = create_access_token(identity=payload)

        # Email configuration
        FRONTEND_URL = os.getenv('FRONTEND_URL')
        email_receiver = email
        email_subject = "Reset Your Password"
        email_body = (
            f"Hello,\n\nYou requested a password reset. "
            f"If you didn't make this request, please ignore this email.\n\n"
            f"Please use the following link to reset your password:\n{FRONTEND_URL}/reset-password?token={access_token}\n\n"
            f"This link is valid for 1 hour.\n\n"
            f"Regards,\nPimp My Ride"
        )

        message = EmailMessage()
        message.set_content(email_body)
        message['Subject'] = email_subject
        message['From'] = 'pimpmyride879@gmail.com'
        message['To'] = email_receiver

        try:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.sendgrid.net', 465, context=context) as server:
                server.login('apikey', os.getenv('SENDGRID_API_KEY'))
                server.send_message(message)
            return jsonify({"message": "Password reset link sent to email."}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/reset-password', methods=['POST'])
def reset_password():
    def verify_token_and_find_user(token):
        decoded_token = decode_token(token)
        email = decoded_token['sub']['email']
        user = User.query.filter_by(email=email).first()
        if user is None:
            user = Customer.query.filter_by(email=email).first()
        print (user)
        print (decoded_token)
        # if user and user.reset_token_expires > datetime.utcnow():
        #     return user
        return user, decoded_token['sub']['role']
    token = request.args.get('token')
    if token is None:
        return jsonify ({"message": "No token on qs"}), 400
    new_password = request.json.get("new_password")
    user, role = verify_token_and_find_user(token)
    if user is None:
        return jsonify({"message": "Invalid or expired token :( ", "role": role}), 404

    user.password = new_password
    user.reset_token = None 
    db.session.commit()
    return jsonify({"message": "Password updated successfully", "role": role}), 200


@api.route('/work_orders/customer', methods=['GET'])
@jwt_required()
def get_work_orders_by_customer():
    cust_id = get_jwt_identity()

    customer = Customer.query.filter_by(id=cust_id).first()
    if not customer:
        return jsonify({"msg": "Customer not found"}), 404

    work_orders = [wo.serialize() for wo in customer.work_orders]

    return jsonify(work_orders), 200


# work order routes ############################################################################ 

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
    raw_data = request.form.get("data")
    data = json.loads(raw_data)
    customer_id = data.get("customer_id", None)
    wo_stages = data.get("wo_stages", None)
    make = data.get("make", None)
    model = data.get("model", None)
    year = data.get("year", None)    
    color = data.get("color", None) 
    vin = data.get("vin", None) 
    license_plate  = data.get("license_plate", None) 
    comments = data.get("comments", None) 
    
    if user_id is None or customer_id is None or wo_stages is None or make is None or model is None or year is None or color is None or vin is None or license_plate  is None:
        return jsonify({"msg": "Some required fields are missing"}), 400
    if is_list_valid(wo_stages) is False:
        return jsonify({"msg": "Please send a valid list of stages"}), 400
    customer = Customer.query.filter_by(id=customer_id).one_or_none()
    if customer is None:
        return jsonify({"msg": "A customer with that id does not exist"}), 404
    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify({"msg": "A user with that id does not exist"}), 404
    work_order = WorkOrder(user_id=user_id, customer_id=customer_id, wo_stages=wo_stages, make=make, model=model, year=year, color=color, vin=vin, license_plate=license_plate)
    db.session.add(work_order)
    db.session.commit()   
    db.session.refresh(work_order)
    images = request.files.getlist("file")
    for image_file in images:
        if len(WorkOrderImage.query.filter_by(work_order_id=work_order.id).all()) > 11:
            break
        response = uploader.upload(image_file)
        print(f"{response.items()}")
        new_image = WorkOrderImage(public_id=response["public_id"], image_url=response["secure_url"],work_order_id=work_order.id)
        db.session.add(new_image)
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
    year = data.get("year")
    color = data.get("color") 
    vin = data.get("vin") 
    license_plate  = data.get("license_plate")
    current_stage = data.get("current_stage")

    if None in (wo_stages, make, model, year, color, vin, license_plate):
        return jsonify({"msg": "Some required fields are missing"}), 400 

    work_order = WorkOrder.query.get(work_order_id)
    if work_order is None:
        return jsonify({"msg": "Work order not found"}), 404
    work_order.wo_stages = wo_stages
    work_order.make = make
    work_order.model = model
    work_order.year = year
    work_order.color = color
    work_order.vin = vin
    work_order.license_plate = license_plate
    work_order.current_stage = current_stage

    db.session.commit()
    db.session.refresh(work_order)
    return jsonify({"work_order": work_order.serialize()}), 200

@api.route('/work-order/photos/<int:work_order_id>', methods=['GET'])
# @admin_required()
def get_work_order_photos(work_order_id):
    work_order = WorkOrder.query.get(work_order_id)
    if work_order is None:
        return jsonify({"msg": "Work order not found"}), 404
    
    photos = WorkOrderImage.query.filter_by(work_order_id=work_order_id).all()
    serialized_photos = [photo.serialize() for photo in photos]
    
    return jsonify({"work_order_photos": serialized_photos}), 200

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
    
    picture_urls = [image.image_url for image in work_order.images]

    for url in picture_urls:
        public_id = url.split("/")[-1].split(".")[0]

    delete_response = delete_resources_by_tag(public_id)
    if delete_response.get("deleted", 0) == 0:
        print(f"Failed to delete picture with URL: {url}")

    db.session.delete(work_order)
    db.session.commit()
    return jsonify({"msg": "Work order successfully deleted"}), 200

#####################################################################################################################


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





# user images endpoint
# @app.route("/todos/<username>/images", methods=["POST", "GET"])
# @app.route("/todos/<username>/images/<int:id>", methods=["DELETE"])
# def handle_user_images(username, id=0):
#     """ 
#         GET to receive all user images as a list of objects,
#         POST to create a new user image.
#     """
#     headers = {
#         "Content-Type": "application/json"
#     }
#     # check if user exists
#     if User.query.filter_by(username=username).first():
#         # user exists

#         if request.method == "GET":
#             # get user images and return them
#             user_images = UserImage.query.filter_by(user_username=username).all()
#             response_body = []
#             if len(user_images) > 0:
#                 for image in user_images:
#                     response_body.append(image.serialize())
#                 status_code = 200
#             else:
#                 response_body = []
#                 status_code = 200

#         elif request.method == "POST":
#             # check if user has less than 5 images stored
#             if len(UserImage.query.filter_by(user_username=username).all()) < 5:
#                 # receive file, secure its name, save it and
#                 # create object to store title and image_url
#                 # target = os.path.join(UPLOAD_FOLDER, "images")
#                 # if not os.path.isdir(target):
#                 #     os.mkdir(target)
#                 try:
#                     image_file = request.files['file']
#                     # filename = secure_filename(image_file.filename)
#                     # extension = filename.rsplit(".", 1)[1]
#                     # hash_name = uuid.uuid4().hex
#                     # hashed_filename = ".".join([hash_name, extension])
#                     # destination = os.path.join(target, hashed_filename)
#                     response = uploader.upload(image_file)
#                     print(f"{response.items()}")
#                     try:
#                         new_image = UserImage(request.form.get("title"), response["public_id"], response["secure_url"], username)
#                         db.session.add(new_image)

#                         try:
#                             db.session.commit()
#                             response_body = {
#                                 "result": "HTTP_201_CREATED. image created for user"
#                             }
#                             status_code = 201
#                         except Exception as error:
#                             db.session.rollback()
#                             response_body = {
#                                 "result": f"HTTP_400_BAD_REQUEST. {type(error)} {error.args}"
#                             }
#                             status_code = 400
#                     except:
#                         db.session.rollback()
#                         status_code = 400
#                         response_body = {
#                             "result": "HTTP_400_BAD_REQUEST. no title in key/value"
#                         }
#                 except Exception as error:
#                     status_code = 400
#                     response_body = {
#                         "result": f"HTTP_400_BAD_REQUEST. {type(error)} {error.args}"
#                     }
                
                
#             else:
#                 # user has 5 images uploaded
#                 response_body = {
#                     "result": "HTTP_404_BAD_REQUEST. cannot upload more than five images, please delete one first."
#                 }
#                 status_code = 404

#         elif request.method == "DELETE":
#             # user wants to delete a certain image, check id
#             if id != 0 and UserImage.query.filter_by(id=id).first():
#                 image_to_delete = UserImage.query.filter_by(id=id).first()
#                 response = uploader.destroy(image_to_delete.public_id)
#                 if "result" in response and response["result"] == "ok":
#                     db.session.delete(image_to_delete)
#                     try:
#                         db.session.commit()
#                         response_body = {
#                             "result": "HTTP_204_NO_CONTENT. image deleted."
#                         }
#                         status_code = 204
#                     except Exception as error:
#                         db.session.rollback()
#                         response_body = {
#                             "result": f"HTTP_500_INTERNAL_SERVER_ERROR. {type(error)} {error.args}"
#                         }
#                 else:
#                     response_body = {
#                         "result": f"HTTP_404_NOT_FOUND. {response['result'] if 'result' in response else 'image not found...'}"
#                     }
#                     status_code = 404
#         else:
#             # bad request method...
#             response_body = {
#                 "result": "HTTP_400_BAD_REQUEST. This is not a valid method for this endpoint."
#             }
#             status_code = 400
#     else:
#         # user doesn't exist
#         response_body = {
#             "result": "HTTP_400_BAD_REQUEST. cannot handle images for non existing user..."
#         }
#         status_code = 400

#     return make_response(
#         jsonify(response_body),
#         status_code,
#         headers
#     )

# static image file serving
# @app.route("/src/static/images/<filename>", methods=["GET"])
# def serve_image(filename):
    
#     secured_filename = secure_filename(filename)
# rimage_path  h =mage_path = os.path.join("images", secured_filename)
    
#     if os.path.exists(os.path.join(app.static_folder, image_path)):
#         return send_from_directory(app.static_folder, image_path)
#     else:
#         return "HTTP_404_NOT_FOUND"