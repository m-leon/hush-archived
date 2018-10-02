import CryptoJS from 'crypto-js';

export const encrypt = (clear, key) => {
  return CryptoJS.AES.encrypt(clear, key).toString();
}

export const decrypt = (cipher, key) => {
  const decryptedBytes = CryptoJS.AES.decrypt(cipher, key);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}
