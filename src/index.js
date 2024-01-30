const express = require('express');
const router = require('./routes');
const connetToDb = require("./database/db");
require('dotenv').config();
const port = process.env.PORT || 5555;
const cors = require('cors');

connetToDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => console.log(`🚀 http://localhost:${port}`));