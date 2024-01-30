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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' permite qualquer origem, você pode especificar origens específicas
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
    next();
});

app.use(router);

app.listen(port, () => console.log(`🚀 http://localhost:${port}`));