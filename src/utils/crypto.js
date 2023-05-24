import CryptoJS from "crypto-js";

// 密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("1234123412341234");
// 密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("1234123412341234");

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
    const valueSrc = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(valueSrc, SECRET_KEY, CRYPTO_CONFIG);
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function cryptoDecrypt(data) {
    const encryptedHexStr = CryptoJS.enc.Base64.parse(data);
    const valueSrc = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(valueSrc, SECRET_KEY, CRYPTO_CONFIG);
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}
