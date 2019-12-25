from flask import Flask, jsonify, render_template, request
from db import Database

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='static')

db = Database("db.db")
db.create_tables()


# login return user or error
@app.route('/api/v1/login', methods=["POST"])
def login():
    data = request.json
    if db.User.auth(data['login'], data['password']):
        return jsonify(db.User.get(email=data['login']))
    return jsonify({"error": True, "code": "401"})


# return all dates
@app.route('/api/v1/time/', methods=["GET"])
def all_time_get():
    tmp = db.Time.get(teacher_id=0)
    return jsonify(tmp)


# return free dates
@app.route('/api/v1/time/free', methods=["GET"])
def free_time_get():
    tmp = db.Time.get(student_id=0)
    return jsonify(tmp)


# return teacher times
@app.route('/api/v1/time/teacher', methods=["GET"])
def teacher_time_get():
    teacher = request.args.get('teacher')
    teacher_id = db.User.get(fio=request.args.get('teacher'))['id']
    tmp = db.Time.get(teacher_id=teacher_id)
    return jsonify({"teacher": teacher, "dates": tmp})


# create/delete teacher times
@app.route('/api/v1/time/teacher', methods=["POST"])
def teacher_time_post():
    teacher_id = db.User.get(fio=request.json['teacher'])['id']  # from fio
    if request.json['action'] == 'create':
        date = request.json['date']  # date, begin, end
        if db.Time.create(date['begin'], date['end'], teacher_id):
            return jsonify({"result": "success"})
        return jsonify({"result": "error"})
    elif request.json['action'] == 'delete':
        date = request.json['date']  # date, begin, end
        if db.Time.delete(date['begin'], date['end'], teacher_id):
            return jsonify({"result": "success"})
    elif request.json['action'] == 'end':
        student_id = db.User.get(fio=request.json['student'])['id']  # from fio
        if db.Time.delete(teacher_id=teacher_id, student_id=student_id):
            return jsonify({"result": "success"})
    return jsonify({"result": "error"})


# set/unset student  time
@app.route('/api/v1/time/student', methods=["POST"])
def student_time_post():
    date = request.json['date']
    student_id = db.User.get(fio=request.json['student'])['id']  # fio
    teacher_id = db.User.get(fio=request.json['teacher'])['id']  # fio
    if request.json['action'] == 'create':
        if db.Time.set(student_id, date['begin'], date['end'], teacher_id):
            return jsonify({"result": "success"})
        return jsonify({"result": "error"})
    elif request.json['action'] == 'delete':
        if db.Time.set(0, date['begin'], date['end'], teacher_id):
            return jsonify({"result": "success"})
        return jsonify({"result": "error"})
    return jsonify({"result": "error"})


# get student time
@app.route('/api/v1/time/student', methods=["GET"])
def student_time_get():
    student_id = db.User.get(fio=request.args.get('student'))['id']
    if db.Time.get(student_id=student_id):
        tmp = db.Time.get(student_id=student_id)
        return jsonify({"result": "success",
                        "date": tmp})
    return jsonify({"result": "error"})


@app.route('/api/v1/check', methods=["GET"])  # get history by student fio
def get_check():
    student_fio = request.args.get('student')
    student_id = db.User.get(fio=student_fio)['id']
    return jsonify(db.Check.get(student_id=student_id))


@app.route('/api/v1/check', methods=["POST"])  # append/delete error in history by student fio, error msg
def post_check():
    student_fio = request.json['student']
    student_id = db.User.get(fio=student_fio)['id']
    action = request.json['action']
    tmp = request.json['data']
    if action == 'add':
        db.Check.create(student_id, tmp['error'], tmp['comment'])
        return jsonify({"success": "true"})
    elif action == 'remove':
        db.Check.delete(student_id, tmp['error'])
        return jsonify({"success": "true"})
    return jsonify({"success": "false"})


@app.route('/api/v1/student/passed', methods=['POST'])
def set_passed():
    student_fio = request.json['student']
    student_id = db.User.get(fio=student_fio)['id']
    if db.User.set(student_id, 1):
        return jsonify({"success": "true"})
    return jsonify({"success": "false"})


@app.route('/api/v1/dev/unset_control', methods=['GET'])
def dev_control_0():
    db.cursor.execute("UPDATE users SET control = 0")
    db.conn.commit()
    return jsonify({"success": "true"})


# frontend index page
@app.route('/')
def index():
    return render_template('index.html')


# all to vue router
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(threaded=False)

# https://hse-exams.herokuapp.com/
# https://github.com/sadfsdfdsa/hse_vkr
