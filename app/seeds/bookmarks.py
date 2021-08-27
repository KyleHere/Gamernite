from app.models import db, Bookmark


def seed_bookmarks():
    bookmarks1 = Bookmark(user_id="1", event_id="1")
    bookmarks2 = Bookmark(user_id="1", event_id="2")
    bookmarks3 = Bookmark(user_id="1", event_id="3")

    db.session.add(bookmarks1)
    db.session.add(bookmarks2)
    db.session.add(bookmarks3)

    db.session.commit()


def undo_bookmarks():
    db.session.execute('TRUNCATE bookmarks RESTART IDENTITY CASCADE;')
    db.session.commit()
