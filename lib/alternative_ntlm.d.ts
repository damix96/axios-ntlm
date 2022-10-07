export function createType1Message(options: any): string;
export function parseType2Message(rawmsg: any): {
    signature: Buffer;
    type: number;
    targetNameLen: number;
    targetNameMaxLen: number;
    targetNameOffset: number;
    targetName: Buffer;
    negotiateFlags: number;
    serverChallenge: Buffer;
    reserved: Buffer;
    targetInfoLen: number;
    targetInfoMaxLen: number;
    targetInfoOffset: number;
    targetInfo: Buffer;
};
export function createType3Message(msg2: any, options: any): string;
declare function create_NT_hashed_password_v1(password: any): Buffer;
declare function create_LM_hashed_password_v1(password: any): Buffer;
export { create_NT_hashed_password_v1 as create_NT_hashed_password, create_LM_hashed_password_v1 as create_LM_hashed_password };
//# sourceMappingURL=alternative_ntlm.d.ts.map