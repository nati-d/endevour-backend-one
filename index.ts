import express from "express";
import router from "./src/routers";

const app = express();

const port = 3000

app.use(express.json())
app.listen(port, () => 
    console.log("Server started at port", port)

);
