from db_init import *


class User:
    def __init__(self, cursor, conn):
        self.cursor = cursor
        self.conn = conn

    def create(self, fio, email, role, password, control=0):
        self.cursor.execute("""INSERT INTO users(fio, role, email, control, password)
                                  VALUES ('{0}', {1}, '{2}', {3}, '{4}')""".format(fio, role, email, control, password)
                            )
        self.conn.commit()
        return True

    def delete(self, id=None, fio=None, email=None):
        # todo
        pass

    def auth(self, email, password):
        tmp = self.cursor.execute(
            "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'").fetchall()
        if len(tmp) == 1:
            return True
        return False

    def get(self, id=None, email=None, fio=None):
        if id:
            tmp = self.cursor.execute("SELECT * FROM users WHERE id = " + str(id)).fetchall()
            if len(tmp) == 1:
                return self.serialize(tmp[0])
        elif email:
            tmp = self.cursor.execute("SELECT * FROM users WHERE email = '" + email + "'").fetchall()
            if len(tmp) == 1:
                return self.serialize(tmp[0])
        elif fio:
            tmp = self.cursor.execute("SELECT * FROM users WHERE fio = '" + fio + "'").fetchall()
            if len(tmp) == 1:
                return self.serialize(tmp[0])
        return False

    def set(self, id=None, control=0):
        self.cursor.execute("UPDATE users SET control = {0} WHERE id = {1}".format(control, id))
        self.conn.commit()
        return True

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {"id": one[0], "fio": one[1], "email": one[3], "role": one[2], "control": one[4]}
        # todo serialize many
        elif many is not None:
            pass
        return {}


class Time:
    def __init__(self, cursor, conn):
        self.cursor = cursor
        self.conn = conn

    def create(self, time_begin, time_end, teacher_id, student_id=0):
        if self.time_free(time_begin=time_begin, time_end=time_end, teacher_id=teacher_id) and time_end > time_begin:
            self.cursor.execute("""INSERT INTO time(time_begin, time_end, teacher_id, student_id)
                          VALUES ({0}, {1}, {2}, {3})""".format(time_begin, time_end, teacher_id, student_id)
                                )

            self.conn.commit()
            return True
        return False

    def delete(self, time_begin=None, time_end=None, teacher_id=None, student_id=None, id=None):
        if id:
            self.cursor.execute("DELETE FROM time WHERE id=" + str(id))
            self.conn.commit()
            return True
        elif time_begin and time_end and teacher_id:
            self.cursor.execute(
                "DELETE FROM time WHERE (time_begin={0} and time_end={1} and teacher_id={2})".format(time_begin,
                                                                                                     time_end,
                                                                                                     teacher_id))
            self.conn.commit()
            return True
        elif teacher_id and student_id:
            self.cursor.execute(
                "DELETE FROM time WHERE (teacher_id={0} and student_id={1})".format(teacher_id, student_id))
            self.conn.commit()
            return True
        return False

    def set(self, student_id=0, time_begin=None, time_end=None, teacher_id=None, id=None):
        if id:
            self.cursor.execute(
                "UPDATE time SET student_id = {0} WHERE id = {1}".format(student_id, teacher_id))
            self.conn.commit()
            return True
        elif time_end and time_begin and teacher_id:
            self.cursor.execute(
                "UPDATE time SET student_id = {0} WHERE (time_begin={1} and time_end={2} and teacher_id={3})".format(
                    student_id, time_begin, time_end, teacher_id))
            self.conn.commit()
            return True
        return False

    def get(self, teacher_id=None, time_begin=None, time_end=None, student_id=None):
        # конкретная запись
        if teacher_id and time_begin and time_end:
            tmp = self.cursor.execute(
                "SELECT * FROM time WHERE teacher_id={0} AND time_begin={1} AND time_end={2}".format(teacher_id,
                                                                                                     time_begin,
                                                                                                     time_end)).fetchall()
            if len(tmp) == 1:
                return self.serialize(tmp[0])
        # все свободные записи преподавателя или все записи, если teacher_id==0
        elif teacher_id is not None:
            if teacher_id == 0:
                tmp = self.cursor.execute(
                    "SELECT * FROM time").fetchall()
                return self.serialize(many=tmp)

            tmp = self.cursor.execute(
                "SELECT * FROM time WHERE teacher_id={0}".format(teacher_id)).fetchall()
            return self.serialize(many=tmp)
        # все свободные записи или запись конкретного студента
        elif student_id is not None:
            tmp = self.cursor.execute(
                "SELECT * FROM time WHERE student_id = {0}".format(student_id)).fetchall()
            if student_id == 0:
                return self.serialize(many=tmp)
            else:
                if len(tmp) > 0:
                    return self.serialize(one=tmp[0])
                return False
        # все свободные записи всех преподавателей в указанный период
        elif time_begin and time_end:
            pass
        # все свободные записи всех преподавателей начиная с _
        elif time_begin:
            pass
        return False

    def time_free(self, time_begin, time_end, teacher_id):
        # todo
        tmp = self.cursor.execute(
            "SELECT * FROM time WHERE teacher_id = {0} AND (({1}>time_begin AND {1}<time_end) OR ({2}>time_begin AND {2}<time_end) OR (time_begin={1} AND time_end={2}))".format(
                teacher_id, time_begin, time_end)).fetchall()
        # print(tmp, time_begin, time_end)
        if len(tmp) == 0:
            return True
        return False

    def serialize(self, one=None, many=None):
        if one is not None:
            tmp_user = User(self.cursor, self.conn)
            tmp = {'id': one[0], 'date': one[1], 'begin': one[1], 'end': one[2],
                   'teacher': tmp_user.get(id=one[3])['fio']}
            if tmp_user.get(id=one[4]):
                tmp['student'] = tmp_user.get(id=one[4])['fio']
            return tmp
        elif many is not None:
            result = []
            for one in many:
                result.append(self.serialize(one=one))
            return result
        return False


class Check:
    def __init__(self, cursor, conn):
        self.cursor = cursor
        self.conn = conn

    def create(self, student_id: int, error: str, comment="", date=0):
        self.cursor.execute("""INSERT INTO 'check'(student_id, error, comment, date)
                          VALUES ({0}, "{1}", "{2}", {3})""".format(student_id, error, comment, date)
                            )
        self.conn.commit()
        return True

    def get(self, student_id=None, date=None):
        if student_id is not None:
            tmp = self.cursor.execute("SELECT * FROM 'check' WHERE student_id={0}".format(student_id)).fetchall()
            return self.serialize(many=tmp)
        elif date is not None and student_id is not None:
            pass
        elif date is not None:
            pass
        return False

    def delete(self, student_id, error=None, date=0):
        self.cursor.execute("DELETE FROM 'check' WHERE student_id={0} AND error='{1}'".format(student_id, error))
        self.conn.commit()
        return True

    def serialize(self, one=None, many=None):
        if one is not None:
            tmp_user = User(self.cursor, self.conn)
            return {'student': tmp_user.get(id=one[1])['fio'], 'error': one[2], 'comment': one[3], 'date': one[4]}
        elif many is not None:
            result = []
            for i in many:
                result.append(self.serialize(one=i))
            return result
        return False


class File:
    def __init__(self, cursor, conn):
        self.cursor = cursor
        self.conn = conn


class Database:
    def __init__(self, db_name):
        import sqlite3
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        # import psycopg2
        # self.conn = psycopg2.connect(dbname='d3c4f6ktqnvqk4', user='smxepsaktjhqtj',
        #                              password='9b45654c8f0f89416058dfe82d9c9a6797780f03297661d1d4856de74fa9ded7',
        #                              host='ec2-54-75-238-138.eu-west-1.compute.amazonaws.com',
        #                              port=5432)

        self.cursor = self.conn.cursor()
        self.User = User(self.cursor, self.conn)
        self.Time = Time(self.cursor, self.conn)
        self.Check = Check(self.cursor, self.conn)
        self.File = File(self.cursor, self.conn)

    def create_tables(self):
        try:
            self.cursor.execute(table_time)
            self.cursor.execute(table_user)
            self.cursor.execute(table_check)
            self.User.create("A K Shuvaev", 'sh@mail.ru', 1, '123')
            self.User.create("V I Novikov", 'nv@mail.ru', 0, '123')
        except Exception:
            pass
