"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./src/routers/index"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("this is home page"));
app.use("/api/user", index_1.default.user);
app.use("/api/admin", index_1.default.adminRoutes);
const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
