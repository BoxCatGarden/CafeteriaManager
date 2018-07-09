CREATE TABLE empl (
emp_id   CHAR(12),
name     VARCHAR(16),
sex      TINYINT(2) NOT NULL,
birthday DATE NOT NULL,
phonenum VARCHAR(11) NOT NULL,
tomb     TINYINT(1) NOT NULL DEFAULT 0,
PRIMARY KEY (emp_id),
CHECK (sex in (0,1,2))
);

CREATE TABLE eat (
emp_id CHAR(12),
time   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (emp_id, time),
FOREIGN KEY (emp_id) REFERENCES empl(emp_id)
	ON DELETE RESTRICT
);

CREATE TABLE user (
user_id VARCHAR(12),
pwd     VARCHAR(32),
name    VARCHAR(16),
type    TINYINT(2) NOT NULL DEFAULT 0,
PRIMARY KEY (user_id),
CHECK (type in (0,1,2))
);

CREATE TABLE bill (
bill_year  YEAR,
bill_month TINYINT,
check_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
user_id    VARCHAR(12) NOT NULL,
PRIMARY KEY (bill_year, bill_month),
FOREIGN KEY (user_id) REFERENCES user(user_id)
	ON DELETE RESTRICT,
CHECK (bill_month BETWEEN 1 AND 12)
);

CREATE PROCEDURE addeat(IN id char(12),IN t timestamp)
BEGIN
	IF EXISTS (SELECT * FROM empl WHERE emp_id=id and tomb=0)
		AND (SELECT count(*) FROM eat WHERE emp_id=id AND TO_DAYS(time)=TO_DAYS(t))<2
	THEN INSERT INTO eat VALUES (id, t);
	END IF;
END;

insert into user values ('everlu','e10adc3949ba59abbe56e057f20f883e','1',0);
insert into user values ('flas','e10adc3949ba59abbe56e057f20f883e','2',1);
insert into user values ('chaos','e10adc3949ba59abbe56e057f20f883e','3',2);