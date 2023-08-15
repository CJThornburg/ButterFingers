from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_friends():
    friends = [
        {
          "fromUser": "demo",
          "toUser": "demo1",
          "status": "active",
        },
        {
          "fromUser": "demo2",
          "toUser": "demo3",
          "status": "pending"
        },
        {
          "fromUser": "demo2",
          "toUser": "demo3",
          "status": "rejected"
        },
        {
          "fromUser": "demo1",
          "toUser": "demo4",
          "status": "active",
        },
        {
          "fromUser": "demo1",
          "toUser": "demo4",
          "status": "active",
        },
        {
          "fromUser": "demo",
          "toUser": "demo3",
          "status": "pending"
        },
        # {
        #   "fromUser": "demo",
        #   "toUser": "demo4",
        #   "status": "pending"
        # },
        {
          "fromUser": "demo",
          "toUser": "demo5",
          "status": "rejected"
        },
        {
          "fromUser": "demo4",
          "toUser": "demo",
          "status": "pending"
        }
    ]


    for friend in friends:
         each_friend = Friend(**friend)
         print(each_friend)
         db.session.add(each_friend)
         db.session.commit()

    return friends


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
