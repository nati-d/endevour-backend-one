import _forgotPassword from "./passwordReset/forgotPassword";
import _verifyConfirmationCode from "./passwordReset/verifyConfirmationCode";
import _changePassword from "./passwordReset/changePassword";
import _getPostUrl from "./getPostUrl";
import _emailSubscription from "./emailSubscription";

namespace Common {
  export const forgotPassword = _forgotPassword;

  export const verifyConfirmationCode = _verifyConfirmationCode;

  export const changePassword = _changePassword;

  export const getPostUrl = _getPostUrl;

  export const emailSubscription = _emailSubscription;
}

export default Common;
