table_time = """
CREATE TABLE "time" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"time_begin"	INTEGER,
	"time_end"	INTEGER,
	"teacher_id"	INTEGER,
	"student_id"	INTEGER
)
"""
table_user = """
CREATE TABLE "users" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"fio"	TEXT,
	"role"	INTEGER,
	"email"	TEXT UNIQUE,
	"control"	INTEGER,
	"password"	TEXT
)
"""

table_check = """
CREATE TABLE "check" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	"student_id"	INTEGER,
	"error"	TEXT,
	"comment"	TEXT,
	"date"	INTEGER
)
"""
