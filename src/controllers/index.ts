import _addAdmin from "./admin/addAdmin";
import _adminLogin from "./admin/adminLogin";
import _userSignup from "./user/signup";
import _insertJobPost from "./job/createJobPost";
import _updateJobPost from "./job/updateJobPost";
import _deleteJobPost from "./job/deleteJobPost";
import _insertJobCatagory from "./job/createJobCatagory";
import _getAdmins from "./admin/getAdmins";
import _confirmPassword from "./admin/confirmPassword";
import _adminProfileImgUpload from "./admin/uploadProfileImg";
namespace Controller {
  export const addAdmin = _addAdmin;

  export const adminLogin = _adminLogin;

  export const getAdmins = _getAdmins;

  export const confirmPassword = _confirmPassword;

  export const adminProfileImgUpload = _adminProfileImgUpload;

  export const userSignup = _userSignup;

  export const insertJobPost = _insertJobPost;

  export const updateJobPost = _updateJobPost;

  export const deleteJobPost = _deleteJobPost;

  export const insertJobCatagory = _insertJobCatagory;
}

export default Controller;
// get all super admins
// get all admins
// update admin profile
// delete admin
// upload admin profile image, delete it and edit it
// verirfy password
