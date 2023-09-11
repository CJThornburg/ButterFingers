from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Score, db
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




# @user_routes.route('/users/<username>')
# @login_required
# def userByUsername(username):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     # print(username)

#     user = User.query.filter(User.username == username).first()
#     # pprint(user)
#     return {"msg" : "hi"}
#     # user = User.query.get(id)
#     # return user.to_dict()


@user_routes.route('/kspmupdate', methods=["PUT"])
@login_required
def updateKSPM():
    """
    Query for KSPM update after a score has been submitted
    """

    print("IN UPDATE ROUTE")

    cur_user = current_user.to_dict()

    userId = cur_user["id"]

    # have all the scores
    scores = Score.query.filter(Score.userId == userId)

    total_KSPM = 0
    count = 0
    for score in scores:
        pprint(score.to_dict())
        cur_score = score.to_dict()
        # print(score)
        print(cur_score['kpm'])
        total_KSPM+= cur_score['kpm']
        count = count + 1

    average_KSPM = total_KSPM / count
 

    # get user info so can update
    user = User.query.get(userId)
    user.averageKSPM=round(average_KSPM)
    db.session.commit()
    return user.to_dict()
