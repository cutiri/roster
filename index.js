//LOAD KEYS and add em to PROCESS.ENV
require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const { Router: studentsRouter } = require("./routes/students");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(studentsRouter);

app.listen(9098);
