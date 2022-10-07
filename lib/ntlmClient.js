"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NtlmClient = void 0;
var axios_1 = __importDefault(require("axios"));
var ntlm = __importStar(require("./ntlm"));
var https = __importStar(require("https"));
var http = __importStar(require("http"));
var dev_null_1 = __importDefault(require("dev-null"));
/**
 * @param credentials An NtlmCredentials object containing the username and password
 * @param AxiosConfig The Axios config for the instance you wish to create
 *
 * @returns This function returns an axios instance configured to use the provided credentials
 */
function NtlmClient(credentials, AxiosConfig) {
    var _this = this;
    var config = AxiosConfig !== null && AxiosConfig !== void 0 ? AxiosConfig : {};
    if (!config.httpAgent) {
        config.httpAgent = new http.Agent({ keepAlive: true });
    }
    if (!config.httpsAgent) {
        config.httpsAgent = new https.Agent({ keepAlive: true });
    }
    var client = axios_1.default.create(config);
    client.interceptors.response.use(function (response) {
        return response;
    }, function (err) { return __awaiter(_this, void 0, void 0, function () {
        var error, t1Msg, _err_1, t2Msg, t3Msg, stream_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    error = err.response;
                    if (!(error &&
                        error.status === 401 &&
                        error.headers["www-authenticate"] &&
                        error.headers["www-authenticate"].includes("NTLM"))) return [3 /*break*/, 7];
                    if (!(error.headers["www-authenticate"].length < 50)) return [3 /*break*/, 4];
                    t1Msg = ntlm.createType1Message(credentials.workstation, credentials.domain);
                    error.config.headers["Authorization"] = t1Msg;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.create()(error.config)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _err_1 = _b.sent();
                    if (error &&
                        error.status === 401 &&
                        error.headers["www-authenticate"] &&
                        error.headers["www-authenticate"].includes("NTLM")) {
                        t2Msg = ntlm.decodeType2Message((error.headers["www-authenticate"].match(/^NTLM\s+(.+?)(,|\s+|$)/) || [])[1]);
                        t3Msg = ntlm.createType3Message(t2Msg, credentials.username, credentials.password, credentials.workstation, credentials.domain);
                        error.config.headers["X-retry"] = "false";
                        error.config.headers["Authorization"] = t3Msg;
                        return [2 /*return*/, axios_1.default.create()(error.config)];
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (!(error.config.responseType === "stream")) return [3 /*break*/, 6];
                    stream_1 = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data;
                    if (!(stream_1 && !stream_1.readableEnded)) return [3 /*break*/, 6];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            stream_1.pipe((0, dev_null_1.default)());
                            stream_1.once("close", resolve);
                        })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: 
                // return new Promise(resolve => {
                // 	setTimeout(() => {
                // 		resolve(client(error.config));
                // 	}, 500);
                // });
                throw err;
                case 7: throw err;
            }
        });
    }); });
    return client;
}
exports.NtlmClient = NtlmClient;
//# sourceMappingURL=ntlmClient.js.map