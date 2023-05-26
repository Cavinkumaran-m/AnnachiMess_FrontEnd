const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
const Route = require("./Routes/CustomerRoutes");
const cors = require("cors");
const app = express();
const crypt = require("bcrypt");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Database Connection
const uri =
  "mongodb+srv://cavinkumaran1257:CAVIN1981@maincluster.ybeixlr.mongodb.net/?retryWrites=true&w=majority";

// const uri = "mongodb://localhost:27017/Annachi";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Session Handling
const Store = new mongoDBSession({
  uri: uri,
  collection: "AnnachiSessions",
});

app.use(
  session({
    secret: "secretKeyForCavinSession12345",
    resave: false,
    saveUninitialized: false,
    store: Store,
  })
);

app.use("/", Route);

app.listen(8080, () => {
  console.log("Server live and running @ port 8080");
});
