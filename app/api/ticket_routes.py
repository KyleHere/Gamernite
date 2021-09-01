from ..models.tickets import Ticket
from ..models.user import User
from ..models.db import db
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime, time
from .auth_routes import validation_errors_to_error_messages
from ..forms.event_form import CreateEventForm

ticket_routes = Blueprint('tickets', __name__)


@ticket_routes.route('/', methods=['GET'])
@login_required
def get_tickets():
    tickets = Ticket.query.all()
    return {ticket.id: ticket.to_dict() for ticket in tickets}
