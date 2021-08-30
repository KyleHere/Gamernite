from ..models.events import Event
from ..models.user import User
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages

event_routes = Blueprint('events', __name__)


@event_routes.route('/', methods=['GET'])
def get_events():
    events = Event.query.all()
    return {event.id: event.to_dict() for event in events}
