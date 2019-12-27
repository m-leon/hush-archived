import Moment from 'moment';

const calculateExpiration = (expirationUnit) => {
  // Calculate the requested expiration time
  if (expirationUnit !== 'view') {
    return (
      Moment()
        // + 1 Day/Week/Month
        .add(1, expirationUnit)
        // To epoch  timestamp
        .unix()
    );
  }

  // Expire after 1 view
  return 0;
};

export default calculateExpiration;
