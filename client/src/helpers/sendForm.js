import Axios from 'axios';

import calculateExpiration from './calculateExpiration';
import { encrypt } from './encryption';

const sendForm = async (values) => {
  // Create ciphertext
  const cipher = encrypt(values.message, values.key);

  // Calculate expiration date
  const expiration = calculateExpiration(values.expiration);

  // Send cipher to server, no other data needs to be sent
  const res = await Axios.post(`/api/post/`, { cipher, expiration });

  // Server did not return an ID, not saved
  if (!res.data.id) {
    throw new Error();
  }

  // Successfully posted to server
  return res.data.id;
};

export default sendForm;
