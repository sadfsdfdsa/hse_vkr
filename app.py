from flask import Flask, jsonify, render_template, request

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='static')


class Period:
    def __init__(self, date, begin, end, teacher, student=None):
        self.date = int(date)
        self.begin = int(begin)
        self.end = int(end)
        self.teacher = teacher
        self.student = student


dates = []
users = [
    {"login": "t_teacher", "password": "123", "role": 1},
    {"login": "t_student", "password": "123", "role": 0}
]


@app.route('/api/v1/login', methods=["POST"])
def login():
    data = request.json
    for user in users:
        if user['login'] == data['login'] and user['password'] == data['password']:
            return jsonify(user)
    return jsonify({"error": True, "code": "401"})


@app.route('/api/v1/time/', methods=["GET"])
def all_time_get():
    tmp = []
    for item in dates:
        tmp.append({'date': item.date, 'begin': item.begin, 'end': item.end, 'teacher': item.teacher})
    return jsonify(tmp)


@app.route('/api/v1/time/free', methods=["GET"])
def free_time_get():
    tmp = []
    for item in dates:
        if not item.student:
            tmp.append({'date': item.date, 'begin': item.begin, 'end': item.end, 'teacher': item.teacher})
    return jsonify(tmp)


@app.route('/api/v1/time/teacher', methods=["GET"])
def teacher_time_get():
    teacher = request.args.get('teacher')
    tmp_dates = []
    for item in dates:
        if item.teacher == teacher:
            tmp_dates.append({'date': item.date, 'begin': item.begin, 'end': item.end, 'student': item.student})
    return jsonify({"teacher": teacher, "dates": tmp_dates})


@app.route('/api/v1/time/teacher', methods=["POST"])
def teacher_time_post():
    if request.json['action'] == 'create':
        date = request.json['date']
        for item in dates:
            if request.json['teacher'] == item.teacher and (int(
                    date['date']) // 60 * 60 * 24 == item.date // 60 * 60 * 24 and \
                                                            ((int(date['begin']) > item.begin and int(
                                                                date['begin']) < item.end) or
                                                             (int(date['end']) > item.begin and int(
                                                                 date['end']) < item.end)
                                                             or (int(date['begin']) == item.begin or int(
                                                                        date['end']) == item.end)
                                                            )):
                return jsonify({"result": "error", "error": "Неверный период"})
        dates.append(Period(request.json['date']['date'], request.json['date']['begin'], request.json['date']['end'],
                            request.json['teacher']))
        return jsonify({"result": "success"})
    elif request.json['action'] == 'delete':
        i = 0
        for date in dates:
            if date.date == request.json['date']['date'] and date.teacher == request.json['teacher']:
                dates.pop(i)
                return jsonify({"result": "success"})
            i += 1
    return jsonify({"result": "error"})


@app.route('/api/v1/time/student', methods=["POST"])
def student_time_post():
    date = request.json['date']
    student = request.json['student']
    teacher = request.json['teacher']
    if request.json['action'] == 'create':
        for item in dates:
            if item.date == int(date['date']) and item.begin == int(
                    date['begin']) and item.end == int(date['end']) and item.teacher == teacher and not item.student:
                item.student = student
                return jsonify({"result": "success"})
        return jsonify({"result": "error"})
    elif request.json['action'] == 'delete':
        for item in dates:
            if item.date == int(date['date']) and item.begin == int(
                    date['begin']) and item.end == int(
                date['end']) and item.teacher == teacher and item.student == student:
                item.student = None
                return jsonify({"result": "success"})
        return jsonify({"result": "error"})
    return jsonify({"result": "error"})


@app.route('/api/v1/time/student', methods=["GET"])
def student_time_get():
    student = request.args.get('student')
    for item in dates:
        if item.student == student:
            return jsonify({"result": "success",
                            "date": {'date': item.date, 'begin': item.begin, 'end': item.end, 'teacher': item.teacher}})
    return jsonify({"result": "error"})


# frontend index page
@app.route('/')
def index():
    return render_template('index.html')


# all to vue router
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
