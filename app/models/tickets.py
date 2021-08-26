from .db import db
from flask import jsonify
from datetime import datetime
from .user import User


class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    num_ticket = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship('User', back_populates="tickets")
    events = db.relationship('Event', back_populates="tickets")

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()

        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'num_ticket': self.num_ticket,
            'timestamp': self.timestamp,
            'user': user.to_dict()
        }
