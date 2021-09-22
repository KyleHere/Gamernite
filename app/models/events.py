from .db import db
from flask import jsonify
from datetime import datetime
from .user import User


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    time = db.Column(db.DateTime, default=datetime.now, nullable=False)
    price = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    pic_url = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

    bookmarks = db.relationship('Bookmark', back_populates="events")
    users = db.relationship('User', back_populates="events")
    tickets = db.relationship('Ticket', back_populates="events")

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'date': self.date,
            'time': self.time,
            'price': self.price,
            'user_id': self.user_id,
            'pic_url': self.pic_url,
            'location': self.location,
            'timestamp': self.timestamp,
            'user': user.to_dict()
        }
