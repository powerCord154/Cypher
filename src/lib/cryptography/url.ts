async function encode(input: string, _: string): Promise<string> {
    return encodeURI(input);
}

async function decode(input: string, _: string): Promise<string> {
    return decodeURI(input);
}

export { encode, decode };
