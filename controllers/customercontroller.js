const Customer = require("../models/customer");
const { Boom } = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const customer = require("../models/customer");

const taskcontroller = {
  registration: async (request, h) => {
    try {
      var customer = new Customer(request.payload);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(customer.password, salt);
      customer.password = hashedPassword;
      var result = await customer.save();
      console.log("registration successful!!");
      return { message: "customer registration successfully", result };
    } catch (error) {
      return "error";
    }
  },
  login: async (request, h) => {
    try {
      const { email, password } = request.payload;

      const customer = await Customer.findOne({ email });
      isBlock = Customer.isBlock;
      //return h.response(user) ;
      console.log("findcustomer");
      if (customer) {
        console.log("customer");
        const validpassword = await bcrypt.compare(password, customer.password);
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
      const customer = await Customer.findById({ _id: credentials._id });

      if (!customer) {
        return "Invalid Credentials";
      }
      const isValid = await bcrypt.compare(oldPassword, customer.password);
      if (!isValid) {
        return h.response("Invalid old password");
      }
      const salt = await bcrypt.genSalt(10);
      driver.password = newPassword;
      const hashedPassword = await bcrypt.hash(customer.password, salt);
      customer.password = hashedPassword;

      var result = await customer.save();
      return { message: "Password changed successfully" };
    } catch (error) {
      return "error";
    }
  },

  editProfile: async (request, h) => {
    try {
      const { credentials } = request.auth;
      var customer = await Customer.findByIdAndUpdate(
        { _id: credentials._id },
        request.payload,
        { new: true }
      );
      console.log("updated");
      return h.response({ message: "Profile Updated successfully", customer });
    } catch (error) {
      return "error";
    }
  },
};
module.exports = taskcontroller;
