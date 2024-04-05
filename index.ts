import express from "express";
import cors from "cors";
import Router from "./src/routers/index";
const app = express();

app.use(cors);
app.use(express.json());

app.get("/", (req, res) => res.send("this is home page"));

app.use("/api/user", Router.user);

app.use("/api/admin", Router.adminRoutes);

app.use("/api/job", Router.job);

app.use("/api/tender", Router.tender);

app.use("/api/news", Router.news);

const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
