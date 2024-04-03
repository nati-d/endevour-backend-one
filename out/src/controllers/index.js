"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addAdmin_1 = __importDefault(require("./admin/addAdmin"));
const adminLogin_1 = __importDefault(require("./admin/adminLogin"));
const signup_1 = __importDefault(require("./user/signup"));
const createJobPost_1 = __importDefault(require("./job/createJobPost"));
const updateJobPost_1 = __importDefault(require("./job/updateJobPost"));
const deleteJobPost_1 = __importDefault(require("./job/deleteJobPost"));
const jobCatagory_1 = __importDefault(require("./job/jobCatagory"));
var Controller;
(function (Controller) {
    Controller.addAdmin = addAdmin_1.default;
    Controller.adminLogin = adminLogin_1.default;
    Controller.userSignup = signup_1.default;
    Controller.insertJobPost = createJobPost_1.default;
    Controller.updateJobPost = updateJobPost_1.default;
    Controller.deleteJobPost = deleteJobPost_1.default;
    Controller.insertJobCatagory = jobCatagory_1.default;
})(Controller || (Controller = {}));
exports.default = Controller;
// get all super admins
// get all admins
// update admin profile
// delete admin
// upload admin profile image, delete it and edit it
// verirfy password
