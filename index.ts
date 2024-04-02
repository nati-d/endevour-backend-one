import express from "express";
import Router from "./src/routers/index"

const app = express();

const port = 3000;
app.use(express.json());

app.use("/api/user", Router.user);

app.use(express.json());
app.use("/api/admin", router.adminRoutes);

app.listen(port, () => console.log("Server started at port", port));
