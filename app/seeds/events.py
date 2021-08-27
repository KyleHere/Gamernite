from app.models import Event, db


def seed_events():
    event1 = Event(name="", description="", time="", price="",
                   user_id="", pic_url="", location="")
    event2 = Event(name="", description="", time="", price="",
                   user_id="", pic_url="", location="")
    event3 = Event(name="", description="", time="", price="",
                   user_id="", pic_url="", location="")
    event4 = Event(name="", description="", time="", price="",
                   user_id="", pic_url="", location="")

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)
    db.session.add(event4)

    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
