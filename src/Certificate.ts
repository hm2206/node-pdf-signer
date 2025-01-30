import { ISign } from "./interfaces/option-sign";
import { IOptionSigner } from "./interfaces/option-signer";
import { resolve } from "path";
import { IResponseSign } from "./interfaces/response-sign";
import { execSync } from "child_process";

export class Certificate {
  constructor(private options: IOptionSigner) {
    this.formatter();
  }

  public async sign(payload: ISign): Promise<IResponseSign> {
    // generate command
    const command: string[] = [];
    // add path file jar
    command.push(this.getJarPath());
    // add path file pfx
    command.push(payload.pfxPath);
    // add password
    command.push(payload.pfxPassword);
    // add file PDF source
    command.push(payload.sourcePath);
    // add file PDF target
    command.push(payload.targetPath);
    // add options
    const parseOption = this.generateOptions();
    command.push(parseOption);
    // process
    return new Promise(async (resolve, reject) => {
      try {
        // parse command
        const parseCommand = `java --add-exports jdk.crypto.mscapi/sun.security.mscapi=ALL-UNNAMED -jar "${command.join(
          `" "`
        )}"`;
        // execute
        execSync(parseCommand);
        // result
        return resolve({
          message: "El pdf se firmó correctamente!",
          sourcePath: payload.sourcePath,
          targetPath: payload.targetPath,
        });
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  private generateOptions(): string {
    const result: string[] = [];
    const currentOptions: any = Object.assign({}, this.options);
    Object.keys(this.options).forEach((attr: string) => {
      const parseAttr = attr.toUpperCase();
      const value: string = currentOptions[attr];
      result.push(`${parseAttr}=${value}`);
    });
    // response
    return result.join(";");
  }

  private formatter() {
    this.options.reason = this.regexRemoveSpace(this.options.reason, "_");
    this.options.location = this.regexRemoveSpace(this.options.location, "_");
    this.options.urlImage = this.options.urlImage
      ? this.options.urlImage
      : this.getImageDefault();
  }

  private regexRemoveSpace(text: string, value: string) {
    return text.replace(/[\s]+/g, value);
  }

  private getJarPath() {
    return resolve(__dirname, "../src/jar/Signature.jar");
  }

  private getImageDefault() {
    return resolve(__dirname, "../src/assets/image.png");
  }
}
