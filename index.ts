import express from "express";
import Router from "./src/routers/index";
const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send("this is home page"));
app.use("/api/user", Router.user);

app.use("/api/admin", Router.adminRoutes);

app.use("/api/job", Router.job)

const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
