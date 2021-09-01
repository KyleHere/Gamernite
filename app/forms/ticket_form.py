from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class TicketForm(FlaskForm):
    numTicket = IntegerField('Number of Tickets', validators=[DataRequired()])
