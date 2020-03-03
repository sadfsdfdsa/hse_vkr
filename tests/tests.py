def test_db_user(db):
    assert db.User.auth(email="sh@maile.ru", password='123'), True
    assert db.User.get(id=1), {'id': 1, 'fio': 'A S Shuvaev', 'email': 'sh@maile.ru', 'role': 1, 'control': 0}
    assert db.User.get(email="sh@maile.ru"), {'id': 1, 'fio': 'A S Shuvaev', 'email': 'sh@maile.ru', 'role': 1,
                                              'control': 0}
    assert db.User.get(fio="A S Shuvaev"), {'id': 1, 'fio': 'A S Shuvaev', 'email': 'sh@maile.ru', 'role': 1,
                                            'control': 0}
    print("Database USER tests passed.")


def test_db_time(db):
    assert db.Time.create(0, 1, 1), True
    assert db.Time.create(1, 4, 1), True
    assert db.Time.create(1, 1, 1) is False, True
    assert db.Time.create(2, 3, 1) is False, True

    print("Database TIME tests passed.")


def test_db_users(db):
    db.create_tables()
    db.User.delete(1)
    print('1')
    db.User.delete(fio='V I Novikov')
    print('2')
    db.User.create("V I Novikov", 'nv@mail.ru', 0, '123')
    db.User.delete(email='nv@mail.ru')
    print('3')
