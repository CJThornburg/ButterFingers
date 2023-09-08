from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin





class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_imageURL = db.Column(db.Text, nullable=True, default="https://img.freepik.com/free-icon/user_318-826358.jpg")
    coverPhoto = db.Column(db.String(255), nullable=True, default="https://mechanicalkeyboards.com/shop/images/products/large_9315_large_DKON2161ST-USPHSFTPGC1U2Z_main.png")
    createdAt = db.Column(db.DateTime, default=db.func.now())
    averageKSPM = db.Column(db.Integer, default=0)

    # one user to many text
    totalExp = db.Column(db.Integer, default=0, nullable=False)
    texts = db.relationship('Text', back_populates='user', cascade="all, delete-orphan")

    # one player(user) to many scores
    scores = db.relationship("Score", back_populates="player")


    # fromUser = db.relationship("Friend", cascade="all, delete-orphan")
    # toUser = db.relationship("Friend", cascade="all, delete-orphan")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "totalExp": self.totalExp
        }

    def to_dict_min(self):
        return{
            'id': self.id,
            'username': self.username,
            "profile_imageURL": self.profile_imageURL,
            "coverPhoto": self.coverPhoto,
            "createdAt": self.createdAt,
            "averageKSPM": self.averageKSPM
        }
