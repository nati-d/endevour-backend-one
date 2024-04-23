"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('google'));
router.get('/callback', passport_1.default.authenticate('google', {
    successRedirect: '/api/user/home',
    failureRedirect: '/auth/google'
}));
router.get('/failure', (req, res) => {
    res.send('google log in failure');
});
exports.default = router;
