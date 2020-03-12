from flask import Flask, render_template
from database.database import Database
from config.config import Config

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='static')
app.config.from_object(Config)

db = Database("db.db")

# db.create_tables()
# db.User.create("A K Shuvaev", "sh@mail.ru", 1, '123')
# db.User.create("V I Novikov", "nv@mail.ru", 0, '123')
# db.User.create("V A Kushev", "va@mail.ru", 1, '123')
# db.User.create("K V Khlebalov", "kv@mail.ru", 0, '123')

# db.cursor.execute("SELECT * FROM users")
# print(db.cursor.fetchall())


# index page
@app.route('/')
def index():
    return render_template('index.html')


# all to vue router
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')


# import routes
from routes.login import *
from routes.file import *
from routes.time import *
from routes.student import *
from routes.dev import *

if __name__ == '__main__':
    app.run()

# https://hse-exams.herokuapp.com/
# https://github.com/sadfsdfdsa/hse_vkr
