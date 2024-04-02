import express from "express";
import Router from "./src/routers/index"

const app = express();

app.use(express.json());

app.use("/api/user", Router.user);

const port = 3000;
app.listen(port, () => 

    console.log("Server started at port", port)

);
