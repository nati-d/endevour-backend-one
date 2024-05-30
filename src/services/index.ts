import _b from "bcrypt";
import _mailto from "./notifications/sendEmail";
require("./auth")

namespace Services {
    export const b = _b;

    export const mailto = _mailto;
}

export default Services;
