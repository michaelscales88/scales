from .server import app, db, ma, init_db, BaseModel


init_db()


from .backend import api_bp

app.register_blueprint(api_bp)


# Configuration for APP
@app.before_first_request
def startup_setup():
    # Inject session to be used by Models
    BaseModel.set_session(db.session)
