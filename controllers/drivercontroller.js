const Driver = require("../models/driver");
const { Boom } = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const driver = require("../models/driver");

const taskcontroller = {
  registration: async (request, h) => {
    try {
      var driver = new Driver(request.payload);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(driver.password, salt);
      driver.password = hashedPassword;
      var result = await driver.save();
      console.log("registration successful!!");
      return { message: "driver registration successfully", result };
    } catch (error) {
      return "error";
    }
  },
  login: async (request, h) => {
    try {
      const { email, password } = request.payload;

      const driver = await Driver.findOne({ email });
      isBlock = driver.isBlock;
      //return h.response(user) ;
      console.log("finddriver");
      if (driver) {
        console.log("driver");
        const validpassword = await bcrypt.compare(password, driver.password);
        if (validpassword) {
          console.log("success");
          return h.response("Login Successfull");
        }
      } else return h.response("invalid username or password");
    } catch (error) {
      return "error";
    }
  },

  changePassword: async (request, h) => {
    try {
      const { oldPassword, newPassword } = request.payload;
      const { credentials } = request.auth;
      const driver = await Driver.findById({ _id: credentials._id });

      if (!driver) {
        return "Invalid Credentials";
      }
      const isValid = await bcrypt.compare(oldPassword, driver.password);
      if (!isValid) {
        return h.response("Invalid old password");
      }
      const salt = await bcrypt.genSalt(10);
      driver.password = newPassword;
      const hashedPassword = await bcrypt.hash(driver.password, salt);
      driver.password = hashedPassword;

      var result = await driver.save();
      return { message: "Password changed successfully" };
    } catch (error) {
      return "error";
    }
  },

  editProfile: async (request, h) => {
    try {
      const { credentials } = request.auth;
      var driver = await Driver.findByIdAndUpdate(
        { _id: credentials._id },
        request.payload,
        { new: true }
      );
      console.log("updated");
      return h.response({ message: "Profile Updated successfully", driver });
    } catch (error) {
      return "error";
    }
  },
};
module.exports = taskcontroller;
