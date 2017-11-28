// encryption.js
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let publicAPI = {
  encryptPassword: function(password) {
      let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      return bcrypt.hashSync(password, salt);
  },
  comparePassword: function(candidatePassword, storedPassword) {
      console.log('comparing passwords');
      console.log(candidatePassword, storedPassword);
      //ndidatePassword, this.password
      return bcrypt.compareSync(candidatePassword, storedPassword);
  }
};

module.exports = publicAPI;
