from app import app, db
from flask import jsonify, request, send_from_directory


@app.route('/api/v1/file', methods=['POST'])
def upload_file():
    file = request.files['file']
    student_id = db.User.get(fio=request.form.get('student'))['id']
    if db.File.save(file, student_id):
        return jsonify({"success": "true"})
    return jsonify({"success": "false"})


@app.route('/api/v1/file/<string:student_fio>_project.docx', methods=['GET'])
def get_file(student_fio):
    student_id = db.User.get(fio=student_fio)['id']
    filename = '{0}_student.docx'.format(student_id)
    return send_from_directory('upload', filename)
