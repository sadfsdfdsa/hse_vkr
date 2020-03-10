from app import app, db
from flask import jsonify, request


# dev
@app.route('/api/v1/dev/unset_control', methods=['GET'])
def dev_control_0():
    db.cursor.execute("UPDATE users SET control = 0")
    db.conn.commit()
    db.cursor.execute("DELETE FROM check_table")
    db.conn.commit()
    db.cursor.execute("DELETE FROM time")
    db.conn.commit()
    return jsonify({"success": "true"})
