from .db import db, environment, SCHEMA, add_prefix_for_prod




class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    fromUser = db.Column(db.String(20))
    toUser = db.Column(db.db.String(20))



    status = db.Column(db.String(10))
    friendRequestTo = db.Column(db.String(20))
