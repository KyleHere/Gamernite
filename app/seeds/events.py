from app.models import Event, db


def seed_events():
    event1 = Event(name="Mid Atlantic Convention Expo", description="Test", time="2:00pm", price="25.00",
                   user_id="1", pic_url="https://i.imgur.com/nAn06Nb.png", location="Home")
    event2 = Event(name="MegaMooseCon", description="Test", time="3:00pm", price="50.00",
                   user_id="1", pic_url="https://i.imgur.com/hPFhYCh.png", location="Home")
    event3 = Event(name="Game-A-Thon", description="Test", time="4:00pm", price="40.00",
                   user_id="1", pic_url="https://i.imgur.com/pwRZjlj.png", location="Home")

    db.session.add(event1)
    db.session.add(event2)
    db.session.add(event3)

    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
