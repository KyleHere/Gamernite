from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask import jsonify
from datetime import datetime
from .user import User


class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("events.id")))
    timestamp = db.Column(db.DateTime, default=datetime.now)

    users = db.relationship("User", back_populates="bookmarks")
    events = db.relationship("Event", back_populates="bookmarks")

    def to_dict(self):
        user = User.query.filter(User.id == self.user_id).first()

        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "timestamp": self.timestamp,
            "user": user.to_dict(),
        }
