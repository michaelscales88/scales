from flask import jsonify, request
from flask_restful import Resource, reqparse

from .models import Task
from .serializer import TaskSchema, to_bool


class TaskListAPI(Resource):

    def __init__(self):
        self.schema = TaskSchema(many=True)
        parser = reqparse.RequestParser()
        parser.add_argument("is_active", type=to_bool)
        self.args = parser.parse_args()
        super().__init__()

    def get(self):
        results = Task.query.filter(Task.done == self.args['is_active']).all()
        return jsonify(
            data=self.schema.dump(results).data
        )


class TaskAPI(Resource):

    def __init__(self):
        self.schema = TaskSchema()
        super().__init__()

    def __del__(self):
        Task.session.commit()

    def get(self, id):
        return self.schema.jsonify(Task.find(id))

    def put(self):
        t = {
            'id': 1,
            'title': u'Buy groceries',
            'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
            'done': False
        }
        task = Task.create(**t)
        print(task)

    def delete(self, id):
        Task.find(id).update(done=True)
