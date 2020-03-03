from app import app, db
from flask import jsonify, request


# login return user or error
@app.route('/api/v1/login', methods=["POST"])
def login():
    data = request.json
    if db.User.auth(data['login'], data['password']):
        return jsonify(db.User.get(email=data['login']))
    return jsonify({"error": True, "code": "401"})
