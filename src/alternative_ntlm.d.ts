declare function createType1Message(workstation: any, domain: any): string;
declare function parseType2Message(rawmsg: string): any;
declare function decodeType2Message(rawmsg?: string): any;
declare function createType3Message(
	type2Message: NtlmType2,
	username: string,
	password: string,
	workstation: string,
	domain: string
): string;
export {
	createType1Message,
	parseType2Message,
	decodeType2Message,
	createType3Message,
};
