// import express, { Router } from "express";
import _user from "./user.routes";
import _admin from "./admin.routes";
import _job from "./job.routes";
import _tender from "./tender.routes";
import _news from "./news.routes";
import _exclusiveJob from "./exclusiveJob.routes";

import _common from "./common.routes";
import _grant from "./grant.routes";
import _blog from "./blog.routes";

namespace Routers {
  export const adminRoutes = _admin;
  export const user = _user;
  export const job = _job;
  export const tender = _tender;
  export const news = _news;
  export const exclusiveJob = _exclusiveJob;
  export const common = _common;
  export const grant = _grant;
  export const blog = _blog;
}

export default Routers;
