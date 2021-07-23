"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const token_service_1 = require("../services/token.service");
exports.isAuthenticated = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = context.req.cookies["token"];
    if (!token)
        return context.res.json({ isAuthenticated: false });
    const token_decoded = token_service_1.tokenServiceInstance.verify(token);
    if (typeof token_decoded == "string")
        return context.res.json({ isAuthenticated: false });
    return next();
});
