import _verifyTender from "./verifyTender";
import _verifyJob from "./verifyJob";
import _verifyBlog from "./verifyBlog";
import _sp from "./verifyServiceProvider";

namespace Verification {
  export const verifyTender = _verifyTender;
  export const verifyJob = _verifyJob;
  export const verifyBlog = _verifyBlog;
  export const verifySP = _sp;
}

export default Verification;
