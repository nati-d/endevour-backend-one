"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = __importDefault(require("./job/add"));
const remove_1 = __importDefault(require("./job/remove"));
const get_1 = __importDefault(require("./job/get"));
const add_2 = __importDefault(require("./news/add"));
const remove_2 = __importDefault(require("./news/remove"));
const get_2 = __importDefault(require("./news/get"));
const add_3 = __importDefault(require("./blog/add"));
const remove_3 = __importDefault(require("./blog/remove"));
const get_3 = __importDefault(require("./blog/get"));
const add_4 = __importDefault(require("./grant/add"));
const remove_4 = __importDefault(require("./grant/remove"));
const get_4 = __importDefault(require("./grant/get"));
const add_5 = __importDefault(require("./tender/add"));
const remove_5 = __importDefault(require("./tender/remove"));
const get_5 = __importDefault(require("./tender/get"));
const add_6 = __importDefault(require("./organization/add"));
const remove_6 = __importDefault(require("./organization/remove"));
const get_6 = __importDefault(require("./organization/get"));
const add_7 = __importDefault(require("./service_provider/add"));
const remove_7 = __importDefault(require("./service_provider/remove"));
const get_7 = __importDefault(require("./service_provider/get"));
var Saved;
(function (Saved) {
    Saved.saveJob = add_1.default;
    Saved.deleteJob = remove_1.default;
    Saved.getJob = get_1.default;
    // -- -- news -- -- //
    Saved.saveNews = add_2.default;
    Saved.deleteNews = remove_2.default;
    Saved.getNews = get_2.default;
    // -- -- blog -- -- //
    Saved.saveBlog = add_3.default;
    Saved.deleteBlog = remove_3.default;
    Saved.getBlog = get_3.default;
    // -- -- grant -- -- //
    Saved.saveGrant = add_4.default;
    Saved.deleteGrant = remove_4.default;
    Saved.getGrant = get_4.default;
    // -- -- Tender -- -- //
    Saved.saveTender = add_5.default;
    Saved.deleteTender = remove_5.default;
    Saved.getTender = get_5.default;
    // -- -- Organization -- -- //
    Saved.saveOrganization = add_6.default;
    Saved.deleteOrganization = remove_6.default;
    Saved.getOrganization = get_6.default;
    // -- -- Service Provider -- -- //
    Saved.saveServiceProvider = add_7.default;
    Saved.deleteServiceProvider = remove_7.default;
    Saved.getServiceProvider = get_7.default;
})(Saved || (Saved = {}));
exports.default = Saved;
