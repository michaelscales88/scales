import os


class Config:
    DEBUG = True
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    PACKAGEDIR = os.path.dirname(BASEDIR)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(PACKAGEDIR, 'tmp/local_app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

