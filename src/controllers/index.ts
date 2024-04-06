import _addAdmin from "./admin/addAdmin";
import _adminLogin from "./admin/adminLogin";
import _getAdmins from "./admin/getAdmins";
import _confirmPassword from "./admin/confirmPassword";
import _adminProfileImgUpload from "./admin/uploadProfileImg";
import _forgotPassword from "./admin/forgotPassword";
import _verifyForgotPassword from "./admin/verifyForgotPassword";
import _userSignup from "./user/signup";
import _insertJobPost from "./job/createJobPost";
import _getJobPost from "./job/getJobPost";
import _updateJobPost from "./job/updateJobPost";
import _deleteJobPost from "./job/deleteJobPost";
import _insertJobCategory from "./job/catagory/createJobCategory";
import _getJobCategory from "./job/catagory/getJobCategory";

import _createNews from "./news/createNews";
import _getNews from "./news/getNews";
import _updateNews from "./news/updateNews";
import _deleteNews from "./news/deleteNews";

namespace Controller {
  export const addAdmin = _addAdmin;

  export const adminLogin = _adminLogin;

  export const getAdmins = _getAdmins;

  export const confirmPassword = _confirmPassword;

  export const forgotPassword = _forgotPassword;

  export const verifyForgotPassword = _verifyForgotPassword;

  export const adminProfileImgUpload = _adminProfileImgUpload;

  // -- User -- //
  export const userSignup = _userSignup;

  // -- Job post -- //
  export const insertJobPost = _insertJobPost;

  export const getJobPost = _getJobPost;

  export const updateJobPost = _updateJobPost;

  export const deleteJobPost = _deleteJobPost;

  // -- Job category -- //
  export const insertJobCategory = _insertJobCategory;

  export const getJobCategory = _getJobCategory;

  // -- News -- //
  export const createNews = _createNews;

  export const getNews = _getNews;

  export const updateNews = _updateNews;

  export const deleteNews = _deleteNews;
}

export default Controller;
// get all super admins
// get all admins
// update admin profile
// delete admin
// upload admin profile image, delete it and edit it
// verirfy password
