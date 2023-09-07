const userRoutes = require("./services/userRoutes.js");
const postRoutes = require("./services/postRoutes.js");
const followRoutes = require("./services/followRoutes.js");
const loginRoute = require("./services/loginRoute.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const cors = require("cors");
const express = require("express");
const session = require("express-session");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hr (in milliseconds)
    },
  })
);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/follow", followRoutes);
app.use("/login", loginRoute);
app.post("/logout", authMiddleware.destroySession);
app.post("/check-auth", authMiddleware.checkSession, (req, res) =>
  res.status(200).json({ auth: req.session.userInfo })
);

app.listen(5080, () => console.log("Running on 5080"));
