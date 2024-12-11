import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import initWebRoutes from "./route/web.js";

require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

let app = express()

app.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

      // Request methods you wish to allow
      res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", true);

      // Pass to next layer of middleware
      next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);

let port = process.env.PORT || 6969;

try {
      mongoose.connect(mongoURL)
      console.log("Connection to database");
} catch (error) {
      console.log('Kết nối mongo bị lỗi r', error)
}

app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`)
})