import _tokenAuth from "./tokenAuth";
import _adminAuth from "./admin/adminAuth";
import _superAdminAuth from "./admin/superAdminAuth";
import _uploadFile from "./uploadFile";
import _sendEmail from "./sendEmail";

namespace Middlewares {
  export const tokenAuth = _tokenAuth;
  export const adminAuth = _adminAuth;
  export const superAdminAuth = _superAdminAuth;
  export const uploadFile = _uploadFile;

  export const sendEmail = _sendEmail;
}

export default Middlewares;
