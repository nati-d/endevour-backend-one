import _addAdmin from "./admin/addAdmin";
import _adminLogin from "./admin/adminLogin";
import _userSignup from "./user/signup";

namespace Controller {
  export const addAdmin = _addAdmin;
  export const adminLogin = _adminLogin;
  export const userSignup = _userSignup;
}

export default Controller;
