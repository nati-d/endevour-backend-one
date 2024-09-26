import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import Router from "./src/routers";
import router from "./src/routers";
import Config from "./src/configs";
require("./src/services");

const app = express();

app.use(session(Config.cookie));
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.set("trust proxy", 1);

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", Router.auth);

app.use("/home", Router.home);

app.use("/api/user", Router.user);

app.use("/api/admin", Router.adminRoutes);

app.use("/api/job", Router.job);

app.use("/api/tender", Router.tender);

app.use("/api/news", Router.news);

app.use("/api/grant", Router.grant);

app.use("/api/grant", Router.grant);

app.use("/api/exclusive-job", Router.exclusiveJob);

app.use("/api/common", Router.common);

app.use("/api/blog", Router.blog);

app.use("/api/service-provider", Router.sp);

app.use("/api/tag", Router.tag);

app.use("/api/verify", Router.verification);

app.use("/api/feadback", Router.customerFeadback);

app.use("/api/personalized-alert", Router.personalizedAlert);



const port = 8080;
app.listen(port, () => console.log("Server started at port", port));
