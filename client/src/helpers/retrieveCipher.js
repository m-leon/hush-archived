import Axios from 'axios';

const retrieveCipher = async (id) => {
  // Make asynchronous request to backend for ciphertext of given ID
  const res = await Axios.get(`/api/post/${id}`);

  // Server side error or invalid/expired ID
  if (!res.data.cipher) {
    throw new Error();
  }

  // Returns cipher from ID
  return res.data.cipher;
};

export default retrieveCipher;
