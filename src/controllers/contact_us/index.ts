import _createContactUs from "./createContactUs";
import _getFeadback from "./getFeadback";
import _getFeadbacks from "./getFeadbacks";
import _resposeToFeadback from "./responseToFeadback";
import _deleteFeadback from "./deleteFeadback";

namespace CustomerFeadback {
  export const createContactUs = _createContactUs;
  export const getFeadback = _getFeadback;
  export const getFeadbacks = _getFeadbacks;
  export const responseToFeadback = _resposeToFeadback;
  export const deleteFeadback = _deleteFeadback;
}

export default CustomerFeadback;
