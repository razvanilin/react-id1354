const simplecrypt = require("simplecrypt");

const User = require("../models/User");

const settings = process.env.NODE_ENV === "production" ? require("../settings") : require("../settings-dev");

const sc = simplecrypt({
  password: settings.secret,
  salt: "10",
});

class UserController {
  constructor() {
    this.user = User;
  }

  create(user) {
    return this.user.findOne({ where: { email: user.email } })
      .then((foundUser) => {
        if (foundUser) return new Promise((resolve, reject) => reject(new Error(409)));
        return this.user.create({
          "name": user.name,
          "email": user.email,
          "password": user.password,
        });
      })
      .then((newUser) => { return newUser; })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }

  findById(id) {
    return this.user.findOne({
      where: { "id": id },
    }).then((user) => {
      if (!user) return new Promise((resolve, reject) => reject(new Error(404)));
      return user;
    }).catch((error) => {
      return new Promise((resolve, reject) => reject(error.message));
    });
  }

  update(id, data) {
    return this.user.update(data, { where: { "id": id } })
      .then(() => {
        return this.findById(id);
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error)));
      });
  }

  delete(id) {
    return this.user.destroy({ where: { id } })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(error));
      });
  }


  login(email, password) {
    return this.user.findOne({ where: { "email": sc.encrypt(email) } })
      .then((foundUser) => {
        if (!foundUser) {
          return new Promise((resolve, reject) => reject(new Error(404)));
        }
        if (!(foundUser.password === sc.encrypt(password))) {
          return new Promise((resolve, reject) => reject(new Error(401)));
        }

        return foundUser;
      })
      .catch((error) => {
        return new Promise((resolve, reject) => reject(new Error(error.message)));
      });
  }
}

module.exports = UserController;
