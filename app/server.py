# app/server.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_mixins import AllFeaturesMixin


Base = declarative_base()


class BaseModel(Base, AllFeaturesMixin):
    __abstract__ = True
    pass


app = Flask(
    __name__,
    instance_relative_config=True,
    instance_path='/tmp'
)
app.config.from_object('tmp.default_config.Config')


db = SQLAlchemy(app, model_class=BaseModel)
ma = Marshmallow(app)


def init_db():
    # Create database and tables
    from app.tasks.models import Task
    db.create_all()
