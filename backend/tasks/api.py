from flask import jsonify
from flask_restful import Resource, reqparse

from .models import Task
from .serializer import TaskSchema, to_bool, to_list


class TaskListAPI(Resource):

    def __init__(self):
        self.schema = TaskSchema(many=True)
        parser = reqparse.RequestParser()
        parser.add_argument("is_done", type=to_bool)
        self.args = parser.parse_args()
        super().__init__()

    def get(self):
        results = Task.query.filter(Task.done == self.args['is_done']).all()
        return jsonify(
            data=self.schema.dump(results).data
        )


class TaskAPI(Resource):

    def __init__(self):
        self.schema = TaskSchema()
        parser = reqparse.RequestParser()
        parser.add_argument("id", type=int)
        parser.add_argument("id_list", type=to_list)
        parser.add_argument("task", type=dict)
        self.args = parser.parse_args()
        super().__init__()

    def __del__(self):
        Task.session.commit()

    def get(self):
        return self.schema.jsonify(Task.find(self.args["id"]))

    def put(self):
        if self.args['id_list']:
            for task_id in self.args['id_list']:
                task = Task.find(task_id)
                if task:
                    task.update(done=False)
        else:
            if self.args['task']:
                Task.create(**self.args['task'])

    def delete(self):
        if self.args['id_list']:
            for task_id in self.args['id_list']:
                Task.find(task_id).update(done=True)
