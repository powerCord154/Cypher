import { Base64 } from "js-base64";

function encode(input: string, _: string): string {
    try {
        return Base64.encode(input);
    } catch (e) {
        return e.message;
    }
}

function decode(input: string, _: string): string {
    try {
        return Base64.decode(input);
    } catch (e) {
        return e.message;
    }
}

export { encode, decode };
