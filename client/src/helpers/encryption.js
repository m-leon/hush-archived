import CryptoJS from 'crypto-js';

export const encrypt = (message, key) => {
  const cipher = CryptoJS.AES.encrypt(message, key);
  return cipher.toString();
};

export const decrypt = (ciphertext, key) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
