from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.types import ARRAY
import datetime

db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    address = db.Column(db.String(250), unique=False, nullable=False)
    phone = db.Column(db.String(120), unique=False, nullable=False)
    work_orders = db.relationship("WorkOrder", back_populates="customer")
    verification_code = db.Column(db.Integer)
    verification_code_expires = db.Column(db.DateTime)
    reset_token = db.Column(db.String(120))
    token_created_at = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Customer {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "phone": self.phone
        }
    

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    work_orders = db.relationship("WorkOrder", back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name
        }
    
class WorkOrder(db.Model):
    __tablename__ = 'work_orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)
    user = db.relationship("User", back_populates="work_orders")
    make = db.Column(db.String(120), unique=False, nullable=False)
    model = db.Column(db.String(120), unique=False, nullable=False)
    year = db.Column(db.String(4), unique=False, nullable=False)
    color= db.Column(db.String(120), unique=False, nullable=False)
    vin = db.Column(db.String(50), unique=False, nullable=False)
    license_plate = db.Column(db.String(120), unique=False, nullable=False)
    customer = db.relationship("Customer", back_populates="work_orders")
    comments = db.relationship("Comment", back_populates="work_order")
    wo_stages = db.Column(MutableList.as_mutable(ARRAY(db.String(255))), default=[])
    current_stage = db.Column(db.String(), nullable=False, default="Car Accepted")
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    images = db.relationship("WorkOrderImage", back_populates="work_order")
# #######################################################################

    def __repr__(self):
        return f'<WorkOrder {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "customer_id": self.customer_id,
            "wo_stages": [stage for stage in self.wo_stages],
            "current_stage": self.current_stage,
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "color": self.color,
            "vin": self.vin,
            "license_plate": self.license_plate,
            "time_created": self.time_created,
            "time_updated": self.time_updated,
            "comments": [comment.serialize() for comment in self.comments],
            "images": [image.serialize() for image in self.images]
        }
    
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_orders.id"), nullable=False)
    message = db.Column(db.String(500), unique=False, nullable=False)
    work_order = db.relationship("WorkOrder", back_populates="comments")

    def __repr__(self):
        return f'<Comment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "work_order_id": self.work_order_id,
            "message": self.message
        }
    
# #######################################################################

class WorkOrderImage(db.Model):
    __tablename__ = 'work_order_image'
    """image to be uploaded by the user/owner """

    # __table_args__ = (
    #     db.UniqueConstraint("user_username", name="unique_user_image"),
    # )
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(500), nullable=False, unique=True)
    image_url = db.Column(db.String(500), nullable=False, unique=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey("work_orders.id"), nullable=False)
    work_order = db.relationship("WorkOrder", back_populates="images")

    def __init__(self, public_id, image_url, work_order_id):
        self.public_id = public_id
        self.image_url = image_url.strip()
        self.work_order_id = work_order_id

    def serialize(self):
        return {
            "id": self.id,
            "image_url": self.image_url
        }
# #######################################################################