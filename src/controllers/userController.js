import userService from "../services/userService.js";

let createNewUser = async (req, res) => {
      let message = await userService.createNewUserService(req.body);

      return res.status(200).json(message);
};

let getAllUser = async (req, res) => {
      let id = req.query.id; //ALL, id
      if (!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters user",
                  users: [],
            });
      }

      let users = await userService.getAllUserService(id);

      return res.status(200).json({
            errCode: 0,
            errMessage: "You get user succeed",
            users,
      });
};

let deleteUser = async (req, res) => {
      let data = req.body.id;
      let message = await userService.deleteUserService(data);

      return res.status(200).json(message);
};

let updateUser = async (req, res) => {
      let data = req.body;

      let message = await userService.updateUserService(data);

      return res.status(200).json(message);
};
let loginUser = async (req, res) => {
      let { email, password } = req.body;

      if (!email || !password) {
            return res.status(400).json({
                  errCode: 1,
                  errMessage: "Missing email or password",
            });
      }

      let data = await userService.loginUserService(email, password);
      return res.status(200).json(data);
};
let RegisterUser = async (req, res) => {
      let { email, password, name } = req.body;

      if (!email || !password || !name) {
            return res.status(400).json({
                  errCode: 1,
                  errMessage: "Missing email or password or userName",
            });
      }

      let message = await userService.registerUserService(email, name, password);
      return res.status(200).json(message);
};
module.exports = {
      createNewUser,
      getAllUser,
      deleteUser,
      updateUser,
      loginUser,
      RegisterUser,
};
