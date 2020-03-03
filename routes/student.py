from app import app, db
from flask import jsonify, request


@app.route('/api/v1/check/', methods=["GET"])  # get errors history by student fio
def get_check():
    student_fio = request.args.get('student')
    student = db.User.get(fio=student_fio)
    if not student:
        return jsonify({"success": "false"})
    return jsonify(db.Check.get(student_id=student['id']))


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


@app.route('/api/v1/student/failed', methods=['POST'])
def set_failed():
    student_fio = request.json['student']
    student_id = db.User.get(fio=student_fio)['id']
    if db.User.set(student_id, 2):
        return jsonify({"success": "true"})
    return jsonify({"success": "false"})
