const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
const path = require("path");
require('dotenv').config();

app.use(cors());
app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x4fm8dg.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
}

connectToDatabase();

app.use("/api/user", userRoutes)
app.use(express.static(path.join(__dirname, "./client/build")));

app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"), function (err) {
        res.status(500).send(err)
    })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}.`);
});
