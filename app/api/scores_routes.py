from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Score, db

from pprint import pprint

score_routes = Blueprint('scores', __name__)


@score_routes.route('')
@login_required
def getScores():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    scores = Score.query.all()



    scores = [score.to_dict() for score in scores]

# NORMALIZED DATA NORMALIZED DATA NORMALIZED DATA FLATTEN FLATTEN LIST FLATTEN ARRay
# un-flatten is in front if need array
    return {
            "Scores": {score["id"]: score for score in scores}
            }


# if you flatten everyone's data and then filter based off that should not need this
@score_routes.route('/<int:userId>')
@login_required
def getUserScores(userId):
    """
    Query for all users and returns them in a list of user dictionaries
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



@score_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteText(id):
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
def postText():
    """
    Query to create a new text card, return updated object or error
    """
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    body = request.json
    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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






    # )
    return {"hi": "hi"}





    #         newText = Text(
    #             name=form.data['name'],
    #             typingText=text,
    #             wordCount=len(textList),
    #             characterCount=len(text),
    #             noSpaceCharacterCount=noSpaceCount,
    #             public=True,
    #             textExp=(len(textList) * 5),
    #             userId=userId
    #         )
    #         db.session.add(newText)
    #         db.session.commit()
    #         return newText.to_dict()
    #     else:
    #         return {}
    # except Exception as e:
    #     error_message = str(e)
    #     traceback_str = traceback.format_exc()
    #     print("THIS IS THE FORM ERRORS", form.errors)
    #     print("Error:", error_message)
    #     print("Traceback:", traceback_str)
    #     return jsonify(error=error_message, traceback=traceback_str), 500
