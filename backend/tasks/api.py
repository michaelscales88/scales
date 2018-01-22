from flask_restful import Resource


from .models import Task
from .serializer import TaskSchema


class TaskListAPI(Resource):

    def __init__(self):
        self.schema = TaskSchema(many=True)
        super().__init__()

    def get(self):
        return self.schema.jsonify(Task.all())


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
            'title': u'Buy groceries',
            'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
            'done': False
        }
        task = Task.create(**t)
        print(task)

    def delete(self, id):
        Task.find(id).update(done=True)
