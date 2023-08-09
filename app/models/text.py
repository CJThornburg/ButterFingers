from .db import db, environment, SCHEMA, add_prefix_for_prod


class Text(db.Model):
    __tablename__ = 'texts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    userId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    typingText = db.Column(db.Text, nullable=False)
    wordCount = db.Column(db.Integer, nullable=False)
    characterCount = db.Column(db.Integer, nullable=False)
    noSpaceCharacterCount = db.Column(db.Integer, nullable=False)
    public = db.Column(db.Boolean, nullable=False)


    # one user to many texts
    user = db.relationship("User", back_populates="texts")


    # # one Text to many scores
    # run = db.relationship("Score", back_populates="text", cascade="all, delete-orphan" )

    def to_dict(self):
        return {
            'id': self.id,
            "name" : self.name,
            "typingText" : self.typingText,
            "wordCount" : self.wordCount,
            "characterCount" : self.characterCount,
            "noSpaceCharacterCount" : self.characterCount,
            "public" : self.public,
               }
