import _forgotPassword from "./passwordReset/forgotPassword";
import _verifyConfirmationCode from "./passwordReset/verifyConfirmationCode";
import _getPostUrl from "./getPostUrl";

namespace Common {
  export const forgotPassword = _forgotPassword;

  export const verifyConfirmationCode = _verifyConfirmationCode;

  export const getPostUrl = _getPostUrl;
}

export default Common;
