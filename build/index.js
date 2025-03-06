"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = exports.Signer = void 0;
const Signer_1 = require("./Signer");
const Certificate_1 = require("./Certificate");
const test_1 = require("./test");
exports.Signer = Signer_1.Signer;
exports.Certificate = Certificate_1.Certificate;
(0, test_1.testRemote)();
