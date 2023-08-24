from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from pprint import pprint

user_routes = Blueprint('users', __name__)


@user_routes.route('')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()

    users = [user.to_dict_min() for user in users]
    # pprint(users)
    return {'Users': {user["username"]: user for user in users}}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()




@user_routes.route('/users/<username>')
@login_required
def userByUsername(username):
    """
    Query for a user by id and returns that user in a dictionary
    """
    # print(username)

    user = User.query.filter(User.username == username).first()
    # pprint(user)
    return {"msg" : "hi"}
    # user = User.query.get(id)
    # return user.to_dict()
