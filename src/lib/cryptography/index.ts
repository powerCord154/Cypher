import * as base64 from "./base64";
import * as cesar from "./cesar";
import * as sha256 from "./sha256";
import * as url from "./url";
import * as md5 from "./md5";

async function encode(
    input: string,
    key: string,
    algorithm: string
): Promise<string> {
    switch (algorithm) {
        case "Base64":
            return base64.encode(input, key);
        case "Cesar Cipher":
            return cesar.encode(input, key);
        case "SHA-256":
            return sha256.encode(input, key);
        case "URL Encoding":
            return url.encode(input, key);
        case "MD5":
            return md5.encode(input, key);
    }

    return "";
}

async function decode(
    input: string,
    key: string,
    algorithm: string
): Promise<string> {
    switch (algorithm) {
        case "Base64":
            return base64.decode(input, key);
        case "Cesar Cipher":
            return cesar.decode(input, key);
        case "URL Encoding":
            return url.decode(input, key);
    }

    return "";
}

export { encode, decode };
