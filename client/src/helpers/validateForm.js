import generateKey from './generateKey';

const validateForm = async (values) => {
  // If key is provided from user, utilize
  // Otherwise generate a new key
  values.key = generateKey(values.key);

  // Don't allow submissions without a message
  if (!values.message) {
    throw new Error();
  }

  return values;
};

export default validateForm;
