import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import Vendor from "../models/vendor";
import emailService from './emailService';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let hashPassword = await bcrypt.hashSync(password, salt);
                  resolve(hashPassword);
            } catch (e) {
                  reject(e);
            }
      })
}

let buildEmailToken = (token) => {
      let result = ''
      result = `${process.env.URL_REACT}/verify-email/token=${token}`
      return result
}

let resgisterNewVendorService = (data) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let hashPasswordFromBcrypt = await hashPassword(data.password);

                  let token = uuidv4()

                  await emailService.sendSimpleEmail({
                        reciverEmail: data.email,
                        nameVendor: data.nameVendor,
                        phoneNumber: data.phoneNumber,
                        redirectLink: buildEmailToken(token)
                  })

                  await Vendor.create({
                        email: data.email,
                        nameVendor: data.nameVendor,
                        phoneNumber: data.phoneNumber,
                        password: hashPasswordFromBcrypt,
                  });


                  resolve({
                        errCode: 0,
                        message: "Added vendor succeed",
                  });
            } catch (e) {
                  reject(e)
            }
      })
}

let getAllVendorsService = (vendorId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";

                  if (vendorId === "ALL") {
                        users = await Vendor.find().select('-password');
                  }
                  if (vendorId && vendorId != 'ALL') {
                        users = await Vendor.findOne({ _id: vendorId }).select('-password');
                  }

                  resolve(users);

            } catch (e) {
                  reject(e)
            }
      })
}
let verifyRegisterVendorService = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.token) {
                        resolve({
                              errCode: 1,
                              errMessage: "Missing parameters verify"
                        })
                  } else {
                        let verify = await Vendor.findOne({
                              where
                        })
                  }
            } catch (e) {
                  reject(e)
            }
      })
}

let vendorLoginService = (emailInput, passwordInput) => {
      return new Promise(async (resolve, reject) => {

            try {
                  let vendorData = {}

                  let vendor = await Vendor.findOne({
                        email: emailInput,
                  });

                  if (!vendor) {
                        return resolve({
                              errCode: 1,
                              message: "User not found",
                        });
                  }

                  console.log('check vendor', vendor)

                  let isMatch = await bcrypt.compare(passwordInput, vendor.password);
                  if (!isMatch) {
                        return resolve({
                              errCode: 2,
                              message: "Invalid password",
                        });
                  }

                  resolve({
                        errCode: 0,
                        message: "Login successful",
                        vendorData: {
                              id: vendor._id,
                              email: vendor.email,
                              name: vendor.nameVendor,
                              phoneNumber: vendor.phoneNumber,
                        },
                  });

                  resolve(vendorData);
            } catch (e) {
                  reject(e)
            }
      })
}


module.exports = {
      resgisterNewVendorService, getAllVendorsService,
      verifyRegisterVendorService, vendorLoginService
};