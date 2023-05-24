import CryptoJS from "crypto-js";

// 密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("dzb");
// 密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("dzb");

const CRYPTO_CONFIG = {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
};

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
export function cryptoEncrypt(data) {
    const dataHex = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, CRYPTO_CONFIG);
    return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function cryptoDecrypt(data) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, CRYPTO_CONFIG);
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}
