from .db import db, environment, SCHEMA, add_prefix_for_prod


class Score(db.Model):
    __tablename__ = 'scores'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    textId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("texts.id")))
    userId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))
    )
    time = db.Column(db.Integer, nullable=False)
    mistakes = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    kpm = db.Column(db.Integer, nullable=False)



    # one user to many  scores
    player = db.relationship("User", back_populates="scores")


    # one text to many SCORES
    # text = db.relationship("Score", back_populates="run" )

    def to_dict(self):
        return {
            'id': self.id,
            "textId" : self.textId,
            "userId" : self.userId,
            "time" : self.time,
            "mistakes" : self.mistakes,
            "createdAt" : self.createdAt,
            "kpm" : self.kpm,
               }
