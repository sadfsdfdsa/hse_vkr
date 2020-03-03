from database.init import *
from database.models import *

from werkzeug.utils import secure_filename
import psycopg2


class Database:
    def __init__(self, db_name):
        # import sqlite3
        # self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.conn = psycopg2.connect(dbname='d6g6k3varr52qg',
                                     user='wggvgxdohnaeas',
                                     password='43cacabc41795e6d2c2aff8db96092e7c192e36a550732c1d2825b4e2fe2bfe7',
                                     host='ec2-54-217-204-34.eu-west-1.compute.amazonaws.com')
        self.cursor = self.conn.cursor()
        self.User = User(self.conn)
        self.Time = Time(self.conn)
        self.Check = Check(self.conn)
        self.File = File(self.conn)

    def create_tables(self):
        self.cursor.execute(table_time)
        self.conn.commit()

        self.cursor.execute(table_user)
        self.conn.commit()

        self.cursor.execute(table_check)
        self.conn.commit()

        self.User.create("A K Shuvaev", 'sh@mail.ru', 1, '123')
        self.conn.commit()

        self.User.create("V I Novikov", 'nv@mail.ru', 0, '123')
        self.conn.commit()
