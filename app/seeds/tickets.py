from app.models import db, Ticket


def seed_tickets():
    tickets1 = Ticket(event_id="1", user_id="1", num_ticket="2")
    tickets2 = Ticket(event_id="2", user_id="1", num_ticket="4")
    tickets3 = Ticket(event_id="3", user_id="1", num_ticket="6")

    db.session.add(tickets1)
    db.session.add(tickets2)
    db.session.add(tickets3)

    db.session.commit()


def undo_tickets():
    db.session.execute('TRUNCATE tickets RESTART IDENTITY CASCADE;')
    db.session.commit()
