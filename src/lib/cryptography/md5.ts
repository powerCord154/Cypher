import { md5 } from "js-md5";

async function encode(input: string, _: string): Promise<string> {
    return md5(input);
}

export { encode };
