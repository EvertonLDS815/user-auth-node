const express = require('express');
const router = require('./routes');
require('dotenv').config();
const port = process.env.PORT || 5555;
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        app.use(express.json());
        app.use(cors(corsOptions));
        
        app.use(router);
        
        app.listen(port, () => console.log(`🚀 http://localhost:${port}`));
    }).catch((err) => console.error(err));
