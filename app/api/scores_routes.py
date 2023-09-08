from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Score, db

from pprint import pprint

score_routes = Blueprint('scores', __name__)


@score_routes.route('/')
def getScores():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    scores = Score.query.all()


    pprint(scores)
    scores = [score.to_dict() for score in scores]

# NORMALIZED DATA NORMALIZED DATA NORMALIZED DATA FLATTEN FLATTEN LIST FLATTEN ARRay
# un-flatten is in front if need array
    return {
            "Scores": {score["id"]: score for score in scores}
            }


# if you flatten everyone's data and then filter based off that should not need this
@score_routes.route('/<int:userId>')
# @login_required
def getUserScores(userId):
    """
    Query for all scores and returns them in a list of user dictionaries
    """

    # cur_user = current_user.to_dict()
    # userId = cur_user["id"]
    scores = Score.query.filter(Score.userId == userId)

    scores = [score.to_dict() for score in scores]

    # return { "Scores": [score.to_dict() for score in scores]}

# NORMALIZED DATA NORMALIZED DATA NORMALIZED DATA FLATTEN FLATTEN LIST FLATTEN ARRay
    return {
            "Scores": {score["id"]: score for score in scores}

            }



# TODO dont neeed this can just filter in the front end



@score_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteScore(id):
    """
    Query for a text by id and deletes it and returns success or error obj
    """
    # only going to render delete button if they are user so dont need to check back here too
    # if end up needing it
    # cur_user = current_user.to_dict()
    # query....
    # if text.userId == cur_user["id"]:
        # delete
    # else "not yours"
    score = Score.query.get(id)
    if not score:
        return {"message": "Score couldn't be found"}
    else:
        db.session.delete(score)
        db.session.commit()
        return {"mes": "successfully deleted"}




@score_routes.route('/<int:id>')
@login_required
def getScore(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    score= Score.query.get(id)
    return score.to_dict()


@score_routes.route('/new', methods=["POST"])
@login_required
def postScore():
    """
    Query to create a new text card, return updated object or error
    """
    # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    body = request.json
    # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    cur_user = current_user.to_dict()
    
    userId = cur_user["id"]

    newScore = Score(
        textId= body["textId"],
        userId= userId,
        time= body["time"],
        mistakes= body["mistakes"],

        kpm= body["kpm"],
        runExp= body["runExp"]
    )
    db.session.add(newScore)
    db.session.commit()
    return newScore.to_dict()




@score_routes.route('/<int:textId>', methods=["Put"])
@login_required
def updateScore(textId):
    score = Score.query.get(textId)

    if not score:
          return {"message": "Score couldn't be found"}
    body = request.json
    score.time= body["time"]
    score.mistakes = body["mistakes"]
    score.kpm=body["kpm"]
    db.session.commit()
    return score.to_dict()
