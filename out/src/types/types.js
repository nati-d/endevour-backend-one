"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Periodicity = exports.Contract_type = exports.Admin_role = void 0;
var Admin_role;
(function (Admin_role) {
    Admin_role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Admin_role["ADMIN"] = "ADMIN";
})(Admin_role || (exports.Admin_role = Admin_role = {}));
var Contract_type;
(function (Contract_type) {
    Contract_type["REMOTE"] = "REMOTE";
    Contract_type["PARTIME"] = "PARTIME";
    Contract_type["FULLTIME"] = "FULLTIME";
    Contract_type["CONTRACT"] = "CONTRACT";
})(Contract_type || (exports.Contract_type = Contract_type = {}));
var Periodicity;
(function (Periodicity) {
    Periodicity["HOURLY"] = "HOURLY";
    Periodicity["MONTHLY"] = "MONTHLY";
    Periodicity["WEEKLY"] = "WEEKLY";
    Periodicity["DAILY"] = "DAILY";
})(Periodicity || (exports.Periodicity = Periodicity = {}));
