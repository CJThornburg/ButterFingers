from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Text
from ..models import Text, Score, db
from app.forms import TextForm
import traceback
from pprint import pprint

text_routes = Blueprint('texts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages




@text_routes.route('')
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



@text_routes.route('/<int:id>', methods=["DELETE"])
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
    text = Text.query.get(id)
    if not text:
        return {"message": "Text couldn't be found"}
    else:
        db.session.delete(text)
        db.session.commit()
        return {"mes": "text successfully deleted"}



@text_routes.route('/new', methods=["POST"])
@login_required
def postText():
    """
    Query to create a new text card, return updated object or error
    """
    try:
        cur_user = current_user.to_dict()
        userId = cur_user["id"]
        form = TextForm()

        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():

            text = form.data['typingText']

            textList= text.split()

            textJoined = ''.join(textList)
            noSpaceCount = len(textJoined)

            newText = Text(
                name=form.data['name'],
                typingText=text,
                wordCount=len(textList),
                characterCount=len(text),
                noSpaceCharacterCount=noSpaceCount,
                public=True,
                textExp=(len(textList) * 5),
                userId=userId
            )
            db.session.add(newText)
            db.session.commit()
            return newText.to_dict()
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        print("THIS IS THE FORM ERRORS", form.errors)
        print("Error:", error_message)
        print("Traceback:", traceback_str)
        return jsonify(error=error_message, traceback=traceback_str), 500




@text_routes.route('/<int:id>', methods=["PUT"])
@login_required
def updateText(id):
    """
    Query for a text by id and update, return updated object or error
    """
    print("hi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    text = Text.query.get(id)


    # textDic = text.to_dict()
    # print(textDic)
    

    form = TextForm()
    textTy = form.data['typingText']

    textList= textTy.split()

    textJoined = ''.join(textList)
    noSpaceCount = len(textJoined)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():

             text.name=form.data['name']
             text.typingText=textTy
             text.wordCount=len(textList)
             text.characterCount=len(textTy)
             text.noSpaceCharacterCount=noSpaceCount
             text.textExp=(len(textList) * 5)
            #  db.session.add(text)
             db.session.commit()
             return text.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401






# @text_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def updateText(id):
#     """
#     Query for a text by id and update, return updated object or error
#     """
#     text = Text.query.get(id)
#     if not text:
#         return {"message": "Product couldn't be found"}
