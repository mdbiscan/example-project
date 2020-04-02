export const validateEmail = value => {
  let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return value && value.match(regex);
};

export const validateLength = (value, length = 8) => {
  return value && value.length >= length;
};

export const validateContainsNumber = value => {
  return value && value.match(/\d/);
};

export const validateContainsUpperCase = value => {
  return value && value.match(/[A-Z]/);
};

export const validateContainsLowerCase = value => {
  return value && value.match(/[a-z]/);
};

export const validatePhoneNumber = value => {
  let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  return value && value.match(regex);
}
