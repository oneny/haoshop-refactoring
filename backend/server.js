require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const { logger } = require("./middlewares/logger");
const credentials = require('./middlewares/credentials');

connectDB();
app.use(logger);
app.use(credentials); 
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("/public"));
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api/refresh", require("./routes/refresh"));

app.use("/api/addresses", require("./routes/addresses"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/brands", require("./routes/brands"));
app.use("/api/carts", require("./routes/carts"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/chatrooms", require("./routes/chatrooms"));
app.use("/api/collections", require("./routes/collections"));
app.use("/api/lookbooks", require("./routes/lookbooks"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/stripe", require("./routes/stripe"));
app.use("/api/users", require("./routes/users"));


app.use(errorHandler);

const PORT = process.env.BACKEND_PORT || 8000;
app.listen(PORT, () => console.log(`서버 running on ${PORT}`));

// process.on("unhandledRejection", (err, promise) => {
//   console.log(`비정상적 에러로 서버 종료 ${err.message}`);
//   server.close(() => process.exit(1));
// });

//200 OK
//201 CREATED (as a result of POST)
//202 Accepted
//204 no Cotents

//400: bad request
//401: Unauthorized
//402: Payment Required
//403: Forbidden
//404: not found (URL...)
//409: Conflict

//500: internal server error

//터미널에서 randomString 받는 법
//node
//require('crypto').randomBytes(35).toString("hex")
