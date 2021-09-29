from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class TicketForm(FlaskForm):
    num_ticket = IntegerField('Number of Tickets', validators=[DataRequired()])
    event_id = IntegerField('EventId', validators=[DataRequired()])
