table_time = """
CREATE TABLE "time" (
	"id"	SERIAL,
	"time_begin"	BIGINT,
	"time_end"	BIGINT,
	"teacher_id"	INTEGER,
	"student_id"	INTEGER
)
"""
table_user = """
CREATE TABLE "users" (
	"id"	SERIAL,
	"fio"	TEXT,
	"role"	INTEGER,
	"email"	TEXT UNIQUE,
	"control"	INTEGER,
	"password"	TEXT
)
"""

table_check = """
CREATE TABLE "check_table" (
	"id"	SERIAL,
	"student_id"	INTEGER,
	"error"	TEXT,
	"comment"	TEXT,
	"date"	BIGINT
)
"""
