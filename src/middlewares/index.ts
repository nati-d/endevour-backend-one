import _tokenAuth from "./tokenAuth";
import _adminAuth from "./admin/adminAuth";
import _superAdminAuth from "./admin/superAdminAuth";
namespace Middlewares {
  export const tokenAuth = _tokenAuth;
  export const adminAuth = _adminAuth;
  export const superAdminAuth = _superAdminAuth;
}

export default Middlewares;
