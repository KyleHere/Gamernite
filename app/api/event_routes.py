# from itertools import Predicate
from ..models.events import Event
from ..models.user import User
from ..models.db import db
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime, time
from .auth_routes import validation_errors_to_error_messages
from ..forms.event_form import CreateEventForm

event_routes = Blueprint('events', __name__)


@event_routes.route('/', methods=['GET'])
def get_events():
    events = Event.query.all()
    return {event.id: event.to_dict() for event in events}


@event_routes.route('/', methods=['POST'])
@login_required
def create_event():
    user = current_user
    form = CreateEventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_event = Event(
            user_id=user.id,
            name=data['name'],
            description=data['description'],
            time=data['time'],
            price=data['price'],
            location=data['location'],
            pic_url=data['pic_url'],
        )

        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
