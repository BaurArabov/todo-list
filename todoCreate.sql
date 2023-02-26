CREATE TABLE status(
	status_id INT PRIMARY KEY IDENTITY(1,1),
	status_name VARCHAR(50) NOT NULL
);

CREATE TABLE tasks(
	task_id INT PRIMARY KEY CLUSTERED IDENTITY(1,1),
	task_descr TEXT NOT NULL,
	created_date DATETIME NOT NULL,
	status_id INT FOREIGN KEY REFERENCES status(status_id)
);

INSERT INTO status(status_name)
VALUES
	('todo'),
	('trash'),
	('done');

INSERT INTO tasks(task_descr, created_date, status_id)
VALUES
	('do hw', CURRENT_TIMESTAMP, 3),
	('send hw', CURRENT_TIMESTAMP, 3),
	('chill', CURRENT_TIMESTAMP, 1);

SELECT * FROM tasks

--SELECT * FROM tasks t JOIN status s ON t.status_id = s.status_id AND s.status_name = 'todo'
