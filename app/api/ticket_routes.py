from ..models.tickets import Ticket
from ..models.user import User
from ..models.db import db
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime, time
from .auth_routes import validation_errors_to_error_messages
from ..forms.ticket_form import TicketForm


ticket_routes = Blueprint('tickets', __name__)


@ticket_routes.route('/', methods=['GET'])
@login_required
def get_tickets():
    tickets = Ticket.query.all()
    return {ticket.id: ticket.to_dict() for ticket in tickets}


@ticket_routes.route('/<int:userId>', methods=['GET'])
@login_required
def get_user_tickets(userId):
    tickets = Ticket.query.all()
    return {ticket.id: ticket.to_dict() for ticket in tickets}


@ticket_routes.route('/', methods=['POST'])
@login_required
def create_ticket():
    user = current_user
    form = TicketForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        new_ticket = Ticket(
            user_id=user.id,
            event_id=data['event_id'],
            num_ticket=data['num_ticket'],
        )

        db.session.add(new_ticket)
        db.session.commit()
        return new_ticket.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ticket_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_ticket(id):
    ticket = Ticket.query.get(id)
    if ticket:
        db.session.delete(ticket)
        db.session.commit()
    else:
        return "The ticket you are trying to delete doesn't exist", 400

    return jsonify("Delete Ticket Success")
