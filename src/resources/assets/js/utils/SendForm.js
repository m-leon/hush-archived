import AES    from 'crypto-js/aes';
import Axios  from 'axios';
import Moment from 'moment';
import Uuid   from 'uuid/v4';

export default async (e) => {
  e.preventDefault();
  // Use key if provided by user, if no key provided generate with UUIDV4
  const key = (e.target.elements.key.value) ? e.target.elements.key.value : Uuid();
  // If we generated a key, update the form so the user can see it
  e.target.elements.key.value = key;

  const clear = e.target.elements.clear.value;
  try {
    // Encrypt cleartext
    const cipher = encrypt(clear, key);

    // Calculate expiration date
    const expiration = calculateExpiration(e.target.elements.expiration.value);

    // Send cipher to server, no other data needs to be sent
    const res = await Axios.post(`/api/post/`, { cipher, expiration });

    // Successfully posted
    if (typeof(res.data.status) !== 'undefined' && res.data.status === '0') {
      return {
        error: '',
        id: res.data.id,
        key
      };
    }

    // Server didn't return with a status == 0, unknown error
    throw 'Failed to send cipher.';
  } catch (e) {
    return { error: e.message, formDisabled: false };
  }
}

export const encrypt = (clear, key) => {
  return AES.encrypt(clear, key).toString();
}

export const calculateExpiration = (formExpiration) => {
  // Default to expire after 1 view
 let expiration = 0;

 // Calculate the requested expiration time
 if (formExpiration !== '0') {
   expiration = Moment().add(1, formExpiration);
   expiration = expiration.unix();
 }

 return expiration;
};
