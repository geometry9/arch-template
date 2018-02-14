const testString = 'Hello reverse me';
//the easy way
testString.split('').reverse().join('');

export const reverseString = (str) => {
  const revArray = [];

  for (let i = str.length - 1; i >= 0; i--) {
    revArray.push(str[i]);
  }

  return revArray.join('');
};
