import express from "express";
import cors from "cors";
import Router from "./src/routers/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
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

app.use("/api/tag", Router.tag);
const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
