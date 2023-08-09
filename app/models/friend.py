from .db import db, environment, SCHEMA, add_prefix_for_prod


order_status = ["pending", "in transit", "delivered"]


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    fromUser = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    toUser = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    friends = db.relationship("User")


    status = db.Column(db.String(10))
    friendRequestTo = db.Column(db.Integer)
