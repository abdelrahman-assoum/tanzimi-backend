import express from "express";
import morgan from "morgan";
import path from "path";
import UserRoute from "./routes/userRoute.js";
import LabelRoute from "./routes/labelRoute.js";
import JournalRoute from "./routes/journalRoute.js";
import TaskRoute from "./routes/taskRoute.js";
import GoalRoute from "./routes/goalRoute.js";
//import and use .env variables
import dotenv from "dotenv";
dotenv.config();

//Connecting to db
import connectDB from "./config/db.js";
await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", UserRoute);
app.use("/label", LabelRoute);
app.use("/journal", JournalRoute);
app.use("/tasks", TaskRoute);
app.use("/goal", GoalRoute);

// error handler
// app.use(function(err, req, res, next) {
//    res.status(err.status || 500).send({
//        success: false,
//        message: err.message
//    });
// });
app.use(function (req, res, next) {
  next(createError(404));
});
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    stack: err.stack,
  });
});

// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
