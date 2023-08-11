from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Friend, db

from pprint import pprint



friend_routes = Blueprint('friends', __name__)


@friend_routes.route('/')
@login_required
def getFriends():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    friends = Friend.query.all()



    friends = [friend.to_dict() for friend in friends]

# NORMALIZED DATA NORMALIZED DATA NORMALIZED DATA FLATTEN FLATTEN LIST FLATTEN ARRay
# un-flatten is in front if need array
    return {
            "Friends": {friend["id"]: friend for friend in friends}
            }
