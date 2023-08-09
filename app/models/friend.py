from .db import db, environment, SCHEMA, add_prefix_for_prod


order_status = ["pending", "in transit", "delivered"]


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    userName1 = db.Column(db.String(20))
    userName2 = db.Column(db.db.String(20))



    status = db.Column(db.String(10))
    friendRequestTo = db.Column(db.Integer)
