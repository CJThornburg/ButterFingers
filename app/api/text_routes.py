from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Text

text_routes = Blueprint('texts', __name__)


@text_routes.route('/')
@login_required
def getTexts():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    texts = Text.query.all()
    return {'texts': [text.to_dict() for text in texts]}


@text_routes.route('/<int:id>')
@login_required
def getText(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    text = Text.query.get(id)
    return text.to_dict()
