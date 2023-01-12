const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);
app.use("/api", require('./routes/User'));
app.use("/api", require('./routes/Upload'));
app.use("/api", require('./routes/Review'));

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});
