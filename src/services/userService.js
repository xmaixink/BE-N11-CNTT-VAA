import User from "../models/user";

import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	});
};

let createNewUserService = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPasswordFromBcrypt = await hashUserPassword(data.password);

			await User.create({
				email: data.email,
				name: data.name,
				password: hashPasswordFromBcrypt,
				phoneNumber: data.phoneNumber,
			});

			resolve({
				errCode: 0,
				message: "Added user succeed",
			});
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUserService = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";

			if (userId === "ALL") {
				users = await User.find();
			}
			if (userId && userId != "ALL") {
				users = await User.findOne({ _id: userId });
			}

			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let deleteUserService = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let foundUser = await User.findOne({ _id: userId });
			if (!foundUser) {
				resolve({
					errCode: 2,
					errMessage: `The user isn't exist`,
				});
			}
			await User.findByIdAndDelete(userId);

			resolve({
				errCode: 0,
				message: "Delete User Ok",
			});
		} catch (e) {
			reject(e);
		}
	});
};

let updateUserService = (data) => {
	return new Promise(async (resolve, reject) => {
	  try {
		if (!data.id) {
		  resolve({
			errCode: 2,
			errMessage: "Missing required parameters updateUserService",
		  });
		}
  
		const user = await User.findOne({
		  _id: data.id,
		});
		let hashPasswordFromBcrypt = null;
		if (data.password) {
		  hashPasswordFromBcrypt = await hashUserPassword(data.password);
		}
		if (user) {
		  user.email = data.email;
		  user.name = data.name;
		  user.phoneNumber = data.phoneNumber || "";
		  user.password = hashPasswordFromBcrypt || user.password;
		  await user.save();
  
		  resolve({
			errCode: 0,
			message: "Update the user succeeds!",
		  });
		} else {
		  resolve({
			errCode: 1,
			errMessage: "User not found",
		  });
		}
  
		resolve({
		  errCode: 0,
		  message: "Update User Ok",
		});
	  } catch (e) {
		reject(e);
	  }
	});
  };
let loginUserService = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return resolve({
					errCode: 1,
					errMessage: "User not found",
				});
			}
			let isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return resolve({
					errCode: 2,
					errMessage: "Invalid password",
				});
			}
			resolve({
				errCode: 0,
				message: "Login successful",
				user: {
					id: user._id,
					email: user.email,
					name: user.name,
					phoneNumber: user.phoneNumber,
				},
			});
		} catch (e) {
			reject(e);
		}
	});
};

let registerUserService = (email, name, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			const foundUser = await User.findOne({ email: email });
			if (foundUser)
				resolve({
					errCode: 1,
					errMessage: "User exit",
				});
			let hashPasswordFromBcrypt = await hashUserPassword(password);

			await User.create({
				email: email,
				name: name,
				password: hashPasswordFromBcrypt,
			});
			resolve({
				errCode: 0,
				message: "user register succeed",
			});
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	createNewUserService,
	getAllUserService,
	deleteUserService,
	updateUserService,
	loginUserService,
	registerUserService,
};
