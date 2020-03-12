from app import app, db
from flask import jsonify, request


# return all dates
@app.route('/api/v1/time', methods=["GET"])
def all_time_get():
    tmp = db.Time.get(teacher_id=0)
    return jsonify(tmp)


# return free dates
@app.route('/api/v1/time/free/', methods=["GET"])
def free_time_get():
    # student_fio = request.args.get('student')
    # tmp = db.Time.get(teacher_id=0)
    # teacher_fio = None
    # for row in tmp:
    #     if 'student' in row:
    #         if row['student'] == student_fio:
    #             teacher_fio = row['teacher']
    #             break
    # if teacher_fio is not None:
    #     tmp = db.Time.get(teacher_id=db.User.get(fio=teacher_fio)['id'])
    # else:
    #     tmp = db.Time.get(student_id=0)

    tmp = db.Time.get(student_id=0)
    return jsonify(tmp)


# return teacher times
@app.route('/api/v1/time/teacher/', methods=["GET"])
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
@app.route('/api/v1/time/student/', methods=["GET"])
def student_time_get():
    student_id = db.User.get(fio=request.args.get('student'))['id']
    if db.Time.get(student_id=student_id):
        tmp = db.Time.get(student_id=student_id)
        return jsonify({"result": "success",
                        "date": tmp})
    return jsonify({"result": "error"})
