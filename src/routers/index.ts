// import express, { Router } from "express";
import _user from "./user.routes";
import _admin from "./adminRouters.routes";
import _job from "./job.routes";

namespace Routers {

    export const adminRoutes = _admin;
    export const user = _user;
    export const job = _job;

}

export default Routers;
