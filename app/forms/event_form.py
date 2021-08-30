# from itertools import Predicate
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError


class CreateEventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    time = StringField('Time', validators=[DataRequired()])
    price = StringField('Price', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    pic_url = StringField('Picture URL', validators=[DataRequired()])
