"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRemote = void 0;
const path_1 = __importDefault(require("path"));
const Signer_1 = require("./Signer");
let pfxPath = path_1.default.join(__dirname, "../src/example/prueba.pfx");
let sourcePath = path_1.default.join(__dirname, "../src/example/example.pdf");
let targetPath = path_1.default.join(__dirname, "../src/example/signature_example.pdf");
let urlImage = path_1.default.join(__dirname, "../src/example/image.png");
const testRemote = () => {
    const signer = new Signer_1.Signer({
        page: 1,
        visible: true,
        reason: "Yo soy el Firmante",
        location: "PE/PCL",
        urlImage,
        positionX: 100,
        positionY: 100,
    });
    signer
        .sign({
        pfxPath,
        pfxPassword: "password",
        sourcePath,
        targetPath,
    })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
};
exports.testRemote = testRemote;
