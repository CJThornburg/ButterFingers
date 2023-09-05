from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.awsHelpers import (upload_file_to_s3, get_unique_filename)
from pprint import pprint

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """

    # !aws account is being wonky again
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():


        profile_imageURL = form.data["profile_imageURL"]

        profile_imageURL.filename = get_unique_filename(profile_imageURL.filename)

        upload = upload_file_to_s3(profile_imageURL)


        if "url" not in upload:
            # print("failed to upload profile pic")
            upload.url = "https://img.freepik.com/free-icon/user_318-826358.jpg"
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)





        coverPhoto = form.data["coverPhoto"]
        coverPhoto.filename = get_unique_filename(coverPhoto.filename)
        upload2 = upload_file_to_s3(coverPhoto)
        # print(upload2)

        if "url" not in upload2:
            # print("failed to upload profile pic")
            upload2.url = "https://mechanicalkeyboards.com/shop/images/products/large_9315_large_DKON2161ST-USPHSFTPGC1U2Z_main.png"
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            # return {"errors": "cover failed to upload"}


        pprint(upload)

        url=upload["url"]
        url2=upload2["url"]
        pprint(url2)
        user = User.query.filter(User.email == form.data['email']).first()
        # if user is not None:
        #     print(user)
        #     return {'errors': "Email already in use, please try another email"}, 401

        user = User(
            username=form.data['username'].lower(),
            email=form.data['email'],
            password=form.data['password'],
            profile_imageURL=url,
            coverPhoto=url2
        )

        db.session.add(user)
        db.session.commit()
        pprint(user.to_dict())
        login_user(user)
        userReturn = user.to_dict()
        return userReturn
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
