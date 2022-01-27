const bcrypt = require("bcrypt");

class GenPassword {
  constructor() {}
}

let pswrd = bcrypt.hashSync("12345", 9);
console.log(pswrd);

module.exports = GenPassword;
