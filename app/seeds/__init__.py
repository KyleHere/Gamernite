from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .tickets import seed_tickets, undo_tickets
from .bookmarks import seed_bookmarks, undo_bookmarks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_events()
    seed_tickets()
    seed_bookmarks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    undo_tickets()
    undo_bookmarks()
    # Add other undo functions here
