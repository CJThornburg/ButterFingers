from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Score

score_routes = Blueprint('scores', __name__)


@score_routes.route('/')
@login_required
def getScores():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    scores = Score.query.all()
    return {'scores': [score.to_dict() for score in scores]}


@score_routes.route('/<int:id>')
@login_required
def getScore(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    score= Score.query.get(id)
    return score.to_dict()
