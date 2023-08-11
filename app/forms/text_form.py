from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
# from app.models import Text



class TextForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    typingText= StringField('typingText', validators=[DataRequired()])
    # submit = SubmitField("Submit")
