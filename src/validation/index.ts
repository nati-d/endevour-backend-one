import _user from "./user";
import _admin from "./admin";
import _job from "./job";
import _news from "./news";
import _grant from "./grant";
import _recommender from "./exclusiveJob";

namespace Validator {
  export const user = _user;

  export const admin = _admin;

  export const job = _job;

  export const news = _news;

  export const recommender = _recommender;

  export const grant = _grant;
}

export default Validator;
