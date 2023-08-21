from app.models import db, Score, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_scores():
    # in query will need to add the text obj
    scores = [
        {
            "textId": 1,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 250,
            "runExp":85
        },
        {
            "textId": 2,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 278,
            "runExp":85
        },
       {
            "textId": 3,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 230,
            "runExp":85
        },
       {
            "textId": 4,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 244,
            "runExp":85
        },
       {
            "textId": 5,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 267,
            "runExp":85
        },
       {
            "textId": 6,
            "userId": 1,
            "time":10000,
            "mistakes": 3,
            "kpm": 200,
            "runExp":85
        },
          {
            "textId": 7,
            "userId": 3,
            "time":10000,
            "mistakes": 3,
            "kpm": 250,
            "runExp":85
        }

    ]


    for score in scores:
         each_score = Score(**score)

         db.session.add(each_score)
         db.session.commit()

    return scores


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_scores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
