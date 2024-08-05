require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Allow credentials (cookies)
  };

const postRoutes = require("./routes/postRoutes");

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

app.use("/seo", postRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})