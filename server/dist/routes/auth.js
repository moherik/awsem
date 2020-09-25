"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var authRouter = express_1.Router();
authRouter.post("/login", AuthController_1.default.login);
authRouter
    .get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }))
    .get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), function (_req, res) {
    res.redirect("/");
});
exports.default = authRouter;
