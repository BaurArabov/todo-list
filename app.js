const sql = require("mssql");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: "DESKTOP-HUGSJHD\\SQLEXPRESS",
  database: "Todo",
  options: {
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);

app.get("/todos", async (req, res) => {
  try {
    await pool.connect();
    const select = await pool
      .request()
      .query(
        `SELECT * FROM tasks t JOIN status s ON t.status_id = s.status_id AND s.status_name = 'todo'`
      );
    res.send(select.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/done", async (req, res) => {
  try {
    await pool.connect();
    const select = await pool
      .request()
      .query(
        `SELECT * FROM tasks t JOIN status s ON t.status_id = s.status_id AND s.status_name = 'done'`
      );
    res.send(select.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/trash", async (req, res) => {
  try {
    await pool.connect();
    const select = await pool
      .request()
      .query(
        `SELECT * FROM tasks t JOIN status s ON t.status_id = s.status_id AND s.status_name = 'trash'`
      );
    res.send(select.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/newTask", async (req, res) => {
  try {
    await pool.connect();

    const task = req.body.task;
    const status_id = req.body.status_id;

    await pool
      .request()
      .query(
        `INSERT INTO tasks(task_descr, created_date, status_id) VALUES ('${task}',CURRENT_TIMESTAMP,${status_id})`
      );

    res.send("New Task added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.delete("/deleteTask", async (req, res) => {
  try {
    await pool.connect();

    const task_id = req.body.task_id;

    await pool.request().query(`DELETE FROM tasks WHERE task_id = ${task_id}`);

    res.send(`Task ${task_id} was deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.put("/updateStatus", async (req, res) => {
  try {
    await pool.connect();

    const status_id = req.body.status_id;

    await pool.request().query(`Update tasks SET status_id = ${status_id}`);

    res.send(`Task status was updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(8080, () => {
  console.log("server is litenning");
});
