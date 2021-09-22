# from itertools import Predicate
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TextField, TimeField
from wtforms.validators import DataRequired, ValidationError


def name_length(form, field):
    name = field.data
    if len(name) == 0:
        raise ValidationError('Name field must be filled')
    elif len(name) > 50:
        raise ValidationError('Name field must be less than 50 characters')


class CreateEventForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(
        'Please provide a name'), name_length])
    description = TextField('Description', validators=[DataRequired()])
    date = DateField('Date', validators=[DataRequired()])
    time = TimeField('Time', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    pic_url = StringField('Picture URL', validators=[DataRequired()])
