import uuid from 'uuid/v4';

const generateKey = (key) => {
  // If provided, use the user's key
  // Otherwise use UUID v4 to generate a key
  return key || uuid();
};

export default generateKey;
