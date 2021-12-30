"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
const path_1 = require("path");
const child_process_1 = require("child_process");
class Signer {
    options;
    constructor(options) {
        this.options = options;
        this.formatter();
    }
    async sign(payload) {
        const command = [];
        command.push(this.getJarPath());
        command.push(payload.pfxPath);
        command.push(payload.pfxPassword);
        command.push(payload.sourcePath);
        command.push(payload.targetPath);
        const parseOption = this.generateOptions();
        command.push(parseOption);
        return new Promise(async (resolve, reject) => {
            try {
                const parseCommand = `java -jar "${command.join(`" "`)}"`;
                (0, child_process_1.execSync)(parseCommand);
                return resolve({
                    message: "El pdf se firmó correctamente!",
                    sourcePath: payload.sourcePath,
                    targetPath: payload.targetPath
                });
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
    generateOptions() {
        const result = [];
        const currentOptions = Object.assign({}, this.options);
        Object.keys(this.options).forEach((attr) => {
            const parseAttr = attr.toUpperCase();
            const value = currentOptions[attr];
            result.push(`${parseAttr}=${value}`);
        });
        return result.join(";");
    }
    formatter() {
        this.options.reason = this.regexRemoveSpace(this.options.reason, "_");
        this.options.location = this.regexRemoveSpace(this.options.location, "_");
        this.options.urlImage = this.options.urlImage ? this.options.urlImage : this.getImageDefault();
    }
    regexRemoveSpace(text, value) {
        return text.replace(/[\s]+/g, value);
    }
    getJarPath() {
        return (0, path_1.resolve)(__dirname, '../src/jar/Signature.jar');
    }
    getImageDefault() {
        return (0, path_1.resolve)(__dirname, '../src/assets/image.png');
    }
}
exports.Signer = Signer;
