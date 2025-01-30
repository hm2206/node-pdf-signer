import { ISign } from "./interfaces/option-sign";
import { IOptionSigner } from "./interfaces/option-signer";
import { IResponseSign } from "./interfaces/response-sign";
export declare class Certificate {
    private options;
    constructor(options: IOptionSigner);
    sign(payload: ISign): Promise<IResponseSign>;
    private generateOptions;
    private formatter;
    private regexRemoveSpace;
    private getJarPath;
    private getImageDefault;
}
