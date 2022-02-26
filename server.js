//imports
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv/config");
//middleware
app.use(cors());
app.use(morgan("dev"));
//body-parser
app.use(express.json());
//view-engine
app.set("view engine", "ejs");
//autherization&authetication
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: "https://dharwinruppa1422.us.auth0.com",
    baseURL: "http://dwin-auth.herokuapp.com",
    clientID: "3M0jctyQxfIlLUDeEM8sK7EHELNMRwLn",
    secret: "zabcdefghijklmnopqrstuvwxyzabcdefghfsdfkdsfjoi",
  })
);
//router-config

//router
app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.redirect("/profile")
    : res.redirect("/login");
});
app.get("/profile", requiresAuth(), (req, res) => {
  console.log(req.oidc.user);
  res.render("index", { info: req.oidc.user });
});
//server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("application is started " + port);
});
