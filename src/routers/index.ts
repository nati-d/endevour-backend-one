// import express, { Router } from "express";
import _user from "./user.routes";
import _admin from "./admin.routes";
import _job from "./job.routes";
import _news from "./news.routes";

namespace Routers {
    export const adminRoutes = _admin;
    export const user = _user;
    export const job = _job;
    export const news = _news;
}

export default Routers;
