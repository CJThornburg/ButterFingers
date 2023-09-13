from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', averageKSPM=245, totalExp=255)
    faye = User(
        username='marnie', email='marnie@aa.io', password='password', averageKSPM=320, totalExp=1700 )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', averageKSPM=189, totalExp=100)
    demo1 = User(
        username='demo1', email='demo1@aa.io', password='password', averageKSPM=200, totalExp=125)
    demo2 = User(
        username='demo2', email='demo2@aa.io', password='password', averageKSPM=100, totalExp=90 )
    demo3 = User(
        username='demo3', email='demo3@aa.io', password='password', averageKSPM=50, totalExp=25 )
    demo4 = User(
        username='demo4', email='demo4@aa.io', password='password', averageKSPM=60, totalExp=80 )
    demo5 = User(
        username='demo5', email='demo5@aa.io', password='password', averageKSPM=40, totalExp=70 )
    demo6 = User(
        username='demo6', email='demo6@aa.io', password='password', averageKSPM=183, totalExp=155 )
    demo7 = User(
        username='demo7', email='demo7@aa.io', password='password', averageKSPM=178, totalExp=140 )
    demo8 = User(
        username='demo8', email='demo8@aa.io', password='password', averageKSPM=222, totalExp=800 )
    demo9 = User(
        username='demo9', email='demo9@aa.io', password='password', averageKSPM=333, totalExp=1500)
    demo10 = User(
        username='demo10', email='demo10@aa.io', password='password', averageKSPM=211, totalExp=800 )
    demo11 = User(
        username='demo11', email='demo11@aa.io', password='password', averageKSPM=588, totalExp=700 )
    demo12 = User(
        username='demo12', email='demo12@aa.io', password='password', averageKSPM=117, totalExp=600)
    demo13 = User(
        username='demo13', email='demo13@aa.io', password='password', averageKSPM=100, totalExp=555 )


    db.session.add(demo)
    db.session.add(faye)
    db.session.add(bobbie)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
