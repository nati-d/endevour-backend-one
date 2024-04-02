// import express, { Router } from "express";
import _user from "./userRouters.routes";
import admin from "./adminRouters.routes";

namespace Routers {

    export const adminRoutes = admin;
    export const user = _user;

}

export default Routers;
