"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = require("passport-google-oauth20");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var constants_1 = require("../utils/constants");
exports.initPassport = function () {
    passport_1.default.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(function (user, done) { return __awaiter(_this, void 0, void 0, function () {
        var userRepo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepo = typeorm_1.getRepository(User_1.User);
                    return [4 /*yield*/, userRepo
                            .findOneOrFail(user.id)
                            .then(function (user) {
                            done(null, user);
                        })
                            .catch(function (err) {
                            done(err, user);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Google oauth 2.0 strategy
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: constants_1.GOOGLE_CLIENT_ID,
        clientSecret: constants_1.GOOGLE_CLIENT_SECRET,
        callbackURL: constants_1.GOOGLE_CALLBACK_URL,
    }, function (_accessToken, _refreshToken, profile, done) { return __awaiter(_this, void 0, void 0, function () {
        var userRepo, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepo = typeorm_1.getRepository(User_1.User);
                    // check if user is exist
                    return [4 /*yield*/, userRepo
                            .findOne({
                            where: { googleProviderId: profile.id },
                        })
                            .then(function (user) { return done(undefined, user); })
                            .catch(function (err) { return done(err, null); })];
                case 1:
                    // check if user is exist
                    _a.sent();
                    newUser = new User_1.User();
                    newUser.googleProviderId = profile.id;
                    newUser.name = profile.displayName;
                    newUser.email =
                        profile.emails && profile.emails.length > 0
                            ? profile.emails[0].value
                            : "";
                    newUser.avatar =
                        profile.photos && profile.photos.length > 0
                            ? profile.photos[0].value
                            : "";
                    // save user to database
                    return [4 /*yield*/, userRepo
                            .save(newUser)
                            .then(function (user) { return done(undefined, user); })
                            .catch(function (err) { return done(err, null); })];
                case 2:
                    // save user to database
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }));
};