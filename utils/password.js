const bcrypt = require('bcrypt');

const hashPassword = async (rawPassword) => {
  try {
    return await bcrypt.hash(rawPassword, 10);
  } catch (err) {
    console.log(err);
    throw new Error('Cannot hash password');
  }
};

const verifyPassword = async (enteredPassword, storedPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, storedPassword);
  } catch (err) {
    console.log(err);
    throw new Error('Cannot compare password');
  }
};

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
