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



# TODO   a single get friend status so front end knows what to render






@friend_routes.route("/new", methods=["POST"])
@login_required
def postStatus():
    cur_user = current_user.to_dict()

    # just need
    body = request.json

    # need to add a query to see if the relation ship exist, both ways  so prob two queries
    # if there is send back a message like, "status is currently pending "
    #               depending on status if it does exist
                    # !might need to do the below to confirm
                #   rejected =>  this will bot be possible as I will not render page at all
                #   "active" =>also can be handled in front end, will have sendRequest function clickable
                #   pending =) also will be handled with the get query and wont have send request acceptable
    newFriend =Friend(
        fromUser = cur_user["username"],
        toUser=body['toUser'],
        status='pending',
        friendRequestTo=body['toUser']
    )
    pprint(newFriend.to_dict())
    db.session.add(newFriend)
    db.session.commit()
    # will need to make sure frontend refreshes with gets and useSelectors to block off the sendRequest action
    return newFriend.to_dict()




@friend_routes.route("/<username>/accept", methods=["PUT"])
@login_required
def acceptReq(username):
    cur_user = current_user.to_dict()
    cur_user = cur_user["username"]
    # username is correct = fromUser
    # !
    # user1 is on user3 page, user 1 sees a accept request because they have a Touser == to currly logged in and fromUser === username params
    # !
    friend = Friend.query.filter(Friend.toUser == cur_user).first()


    if not friend:
        return {"message": "error, friendship does not exist"}


    friend.status="active"
    db.session.commit()
    return friend.to_dict()
    #   can get fromUser from the react url /<username>, need to pull in params
    #  this action will only be visible to user if, the get returned them

    # query for toUser  is the current user,

@friend_routes.route("/<username>/reject", methods=["PUT"])
@login_required
def rejectReq(username):
    cur_user = current_user.to_dict()
    cur_user = cur_user["username"]
    # username is correct = fromUser
    # !
    # user1 is on user3 page, user 1 sees a accept request because they have a Touser == to currly logged in and fromUser === username params
    # !
    friend = Friend.query.filter(Friend.toUser == cur_user).first()


    if not friend:
        return {"message": "error, friendship does not exist"}


    friend.status="reject"
    db.session.commit()
    return friend.to_dict()


# @friend_routes.route("/<username>/reject", methods=["PUT"])
# @login_required
# def acceptReq(username):
#     cur_user = current_user.to_dict()

#     # username is correct = fromUser
#     friend = Friend.query.filter(Friend.toUser == username).first()

#     if not friend:
#         return {"message": "error, friendship does not exist"}


#     friend.status="active"
#     db.session.commit()
#     return friend.to_dict()
