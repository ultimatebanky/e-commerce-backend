require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", 
    "https://e-commerce-frontend-lime-eight.vercel.app", "https://outlook.live.com"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect('mongodb+srv://devremight95:Myfuturemykids@cluster0.vysssq2.mongodb.net/LOGISTICS_DB')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
