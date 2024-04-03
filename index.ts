import express from "express";
import Router from "./src/routers/index";
import "dotenv/config";
const app = express();

app.use(express.json());

app.use("/api/user", Router.user);

app.use("/api/admin", Router.adminRoutes);

const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
