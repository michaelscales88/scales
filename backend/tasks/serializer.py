from json import loads

from backend import ma
from .models import Task


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task


def to_bool(val):
    return loads(val)
