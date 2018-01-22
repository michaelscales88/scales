from backend import db


class Task(db.Model):

    __tablename__ = 'task'
    __repr_attrs__ = ['id', 'title', 'description', 'done']

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.TEXT)
    done = db.Column(db.Boolean, default=False)
