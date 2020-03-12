import os


class User:
    def __init__(self, conn):
        self.conn = conn

    def create(self, fio, email, role, password, control=0):
        with self.conn.cursor() as cursor:
            cursor.execute("""INSERT INTO users(fio, role, email, control, password)
                                      VALUES ('{0}', {1}, '{2}', {3}, '{4}')""".format(fio, role, email, control,
                                                                                       password)
                           )
            self.conn.commit()
            return True

    def delete(self, id=None, fio=None, email=None):
        with self.conn.cursor() as cursor:
            if id is not None:
                cursor.execute("DELETE FROM users WHERE id=" + str(id))
                self.conn.commit()
                return True
            elif fio is not None:
                cursor.execute("DELETE FROM users WHERE fio='" + str(fio) + "'")
                self.conn.commit()
                return True
            elif email is not None:
                cursor.execute("DELETE FROM users WHERE email='" + str(email) + "'")
                self.conn.commit()
                return True
            cursor.execute("DELETE FROM users")
            self.conn.commit()
            return True

    def auth(self, email, password):
        with self.conn.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'")
            tmp = cursor.fetchall()
            if len(tmp) == 1:
                return True
            return False

    def get(self, id=None, email=None, fio=None):
        with self.conn.cursor() as cursor:
            if id is not None:
                cursor.execute(str("SELECT * FROM users WHERE id=" + str(id)))
                tmp = cursor.fetchall()
                if len(tmp) == 1:
                    return self.serialize(tmp[0])
            elif email is not None:
                cursor.execute(str("SELECT * FROM users WHERE email='" + email + "'"))
                tmp = cursor.fetchall()
                if len(tmp) == 1:
                    return self.serialize(tmp[0])
            elif fio is not None:
                cursor.execute(str("SELECT * FROM users WHERE fio='" + fio + "'"))
                tmp = cursor.fetchall()
                if len(tmp) == 1:
                    return self.serialize(tmp[0])

    def set(self, id=None, control=0):
        with self.conn.cursor() as cursor:
            cursor.execute("UPDATE users SET control = {0} WHERE id={1}".format(control, id))
            self.conn.commit()
            return True

    def serialize(self, one=None, many=None):
        result = []
        if one is not None:
            return {"id": one[0], "fio": one[1], "email": one[3], "role": one[2], "control": one[4]}
        elif many is not None:
            for item in many:
                result.append(self.serialize(one=item))
        return result


class Time:
    def __init__(self, conn):
        self.conn = conn

    def create(self, time_begin, time_end, teacher_id, student_id=0):
        with self.conn.cursor() as cursor:
            if self.time_free(time_begin=time_begin, time_end=time_end,
                              teacher_id=teacher_id) and time_end > time_begin:
                cursor.execute("""INSERT INTO time(time_begin, time_end, teacher_id, student_id)
                              VALUES ({0}, {1}, {2}, {3})""".format(time_begin, time_end, teacher_id, student_id)
                               )

                self.conn.commit()
                return True
            return False

    def delete(self, time_begin=None, time_end=None, teacher_id=None, student_id=None, id=None):
        with self.conn.cursor() as cursor:

            if id:
                cursor.execute("DELETE FROM time WHERE id=" + str(id))
                self.conn.commit()
                return True
            elif time_begin and time_end and teacher_id:
                cursor.execute(
                    "DELETE FROM time WHERE (time_begin={0} and time_end={1} and teacher_id={2})".format(time_begin,
                                                                                                         time_end,
                                                                                                         teacher_id))
                self.conn.commit()
                return True
            elif teacher_id and student_id:
                cursor.execute(
                    "DELETE FROM time WHERE (teacher_id={0} and student_id={1})".format(teacher_id, student_id))
                self.conn.commit()
                return True
            return False

    def set(self, student_id=0, time_begin=None, time_end=None, teacher_id=None, id=None):
        with self.conn.cursor() as cursor:
            if id:
                cursor.execute(
                    "UPDATE time SET student_id = {0} WHERE id = {1}".format(student_id, teacher_id))
                self.conn.commit()
                return True
            elif time_end and time_begin and teacher_id:
                cursor.execute(
                    "UPDATE time SET student_id = {0} WHERE (time_begin={1} and time_end={2} and teacher_id={3})".format(
                        student_id, time_begin, time_end, teacher_id))
                self.conn.commit()
                return True
            return False

    def get(self, teacher_id=None, time_begin=None, time_end=None, student_id=None):
        with self.conn.cursor() as cursor:

            # конкретная запись
            if teacher_id is not None and time_begin is not None and time_end is not None:
                cursor.execute(
                    "SELECT * FROM time WHERE teacher_id={0} AND time_begin={1} AND time_end={2}".format(teacher_id,
                                                                                                         time_begin,
                                                                                                         time_end))
                tmp = cursor.fetchall()
                if len(tmp) == 1:
                    return self.serialize(tmp[0])
            # все свободные записи преподавателя или все записи, если teacher_id==0
            elif teacher_id is not None:
                if teacher_id == 0:
                    cursor.execute(
                        "SELECT * FROM time")
                    tmp = cursor.fetchall()
                    return self.serialize(many=tmp)
                cursor.execute(
                    "SELECT * FROM time WHERE teacher_id={0}".format(teacher_id))
                tmp = cursor.fetchall()
                return self.serialize(many=tmp)
            # все свободные записи или запись конкретного студента
            elif student_id is not None:
                cursor.execute(
                    "SELECT * FROM time WHERE student_id = {0}".format(student_id))

                tmp = cursor.fetchall()
                if student_id == 0:
                    return self.serialize(many=tmp)
                else:
                    if len(tmp) > 0:
                        return self.serialize(one=tmp[0])
                    return False
            # все свободные записи всех преподавателей в указанный период
            elif time_begin is not None and time_end is not None:
                pass
            # все свободные записи всех преподавателей начиная с _
            elif time_begin is not None:
                pass
            return False

    def time_free(self, time_begin, time_end, teacher_id):
        with self.conn.cursor() as cursor:
            # todo
            cursor.execute(
                "SELECT * FROM time WHERE teacher_id = {0} AND (({1}>time_begin AND {1}<time_end) OR ({2}>time_begin AND {2}<time_end) OR (time_begin={1} AND time_end={2}))".format(
                    teacher_id, time_begin, time_end))
            tmp = cursor.fetchall()
            if len(tmp) == 0:
                return True
            return False

    def serialize(self, one=None, many=None):
        if one is not None:
            tmp_user = User(self.conn)
            tmp = {'id': one[0], 'date': one[1], 'begin': one[1], 'end': one[2],
                   'teacher': tmp_user.get(id=one[3])['fio']}

            if tmp_user.get(id=one[4]):
                tmp['student'] = tmp_user.get(id=one[4])['fio']

            return tmp

        elif many is not None:
            result = []
            for one1 in many:
                result.append(self.serialize(one=one1))
            return result

        return False


class Check:
    def __init__(self, conn):
        self.conn = conn

    def create(self, student_id: int, error: str, comment="", date=0):
        with self.conn.cursor() as cursor:
            cursor.execute("""INSERT INTO check_table (student_id, error, comment, date)
                              VALUES ({0}, '{1}', '{2}', {3})""".format(student_id, error, comment, date)
                           )
            self.conn.commit()
            return True

    def get(self, student_id=None, date=None):
        with self.conn.cursor() as cursor:
            if student_id is not None:
                cursor.execute("SELECT * FROM check_table WHERE student_id={0}".format(student_id))
                tmp = cursor.fetchall()
                return self.serialize(many=tmp)
            elif date is not None and student_id is not None:
                pass
            elif date is not None:
                pass
            return False

    def delete(self, student_id, error=None, date=0):
        with self.conn.cursor() as cursor:
            cursor.execute("DELETE FROM check_table WHERE student_id={0} AND error='{1}'".format(student_id, error))
            self.conn.commit()
            return True

    def serialize(self, one=None, many=None):
        if one is not None:
            tmp_user = User(self.conn)
            return {'student': tmp_user.get(id=one[1])['fio'], 'error': one[2], 'comment': one[3], 'date': one[4]}
            # return {'error': one[2], 'comment': one[3], 'date': one[4]}

        elif many is not None:
            result = []
            for i in many:
                result.append(self.serialize(one=i))
            return result
        return False


class File:
    def __init__(self, conn):
        self.conn = conn
        self.UPLOAD_FOLDER = 'D:/work/pycharm_projects/kursach/upload/'
        self.ALLOWED_EXTENSIONS = set(['docx', 'doc'])

    def allowed_file(self, filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1] in self.ALLOWED_EXTENSIONS

    def save(self, file, student_id):
        if file and self.allowed_file(file.filename):
            filename = str(student_id) + '_student.' + file.filename.rsplit('.', 1)[1]
            file.save(os.path.join(self.UPLOAD_FOLDER, filename))
            return True
        return False

    def get(self, student_id):
        try:
            f = open("/upload/" + str(student_id) + '_student.docx')
            return f
        except IOError:
            print("File not accessible")
        finally:
            f.close()
