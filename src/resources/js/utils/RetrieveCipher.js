import Axios from 'axios';

export default async (id) => {
  try {
    // Make asynchronous request to backend for ciphertext of given ID
    const res = await Axios.get(`/api/post/${id}`);
    // Successfully retrieved ciphertext
    if (typeof res.data.status !== 'undefined' && res.data.status === '0') {
      return {
        cipher: res.data.ciphertext,
        error: ''
      };
    }
    throw '';
  } catch (e) {
    return {
      cipher: '',
      error: 'Failed to retrieve cipher'
    };
  }
};
