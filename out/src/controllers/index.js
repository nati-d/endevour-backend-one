"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addAdmin_1 = __importDefault(require("./admin/addAdmin"));
const adminLogin_1 = __importDefault(require("./admin/adminLogin"));
const signup_1 = __importDefault(require("./user/signup"));
var Controller;
(function (Controller) {
    Controller.addAdmin = addAdmin_1.default;
    Controller.adminLogin = adminLogin_1.default;
    Controller.userSignup = signup_1.default;
})(Controller || (Controller = {}));
exports.default = Controller;
// get all super admins
// get all admins
// update admin profile
// delete admin
// upload admin profile image, delete it and edit it
// verirfy password
