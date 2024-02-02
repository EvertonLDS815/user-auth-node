const express = require('express');
const router = require('./routes');
const connetToDb = require("./database/db");
require('dotenv').config();
const port = process.env.PORT || 5555;
const cors = require('cors');

connetToDb();

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

app.listen(port, () => console.log(`🚀 http://localhost:${port}`));