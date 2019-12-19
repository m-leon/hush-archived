import { decrypt, encrypt } from '../../utils/Encryption';

test('should encrypt and decrypt', () => {
  const initCleartext = 'ABC123';
  const encKey = 'jfrjeaifj';
  const ciphertext = encrypt(initCleartext, encKey);
  const secondClear = decrypt(ciphertext, encKey);
  expect(initCleartext).toBe(secondClear);
});
