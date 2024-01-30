const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const connetToDb = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then(() => console.log("🚀 MongoDB Atlas Connected!!"))
        .catch((err) => console.error(err));
};

module.exports = connetToDb;