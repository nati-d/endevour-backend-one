import _b from "bcrypt";
import _forgotPassword from "./passwordReset/forgotPassword";
import _verifyConfirmationCode from "./passwordReset/verifyConfirmationCode";
namespace Services {
  export const b = _b;

  export const forgotPassword = _forgotPassword;

  export const verifyConfirmationCode = _verifyConfirmationCode;
}

export default Services;
