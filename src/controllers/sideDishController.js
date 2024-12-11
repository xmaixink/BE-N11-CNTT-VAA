import sideDishService from "../services/sideDishService";

let createNewSideDish = async (req, res) => {
  try {
    let message = await sideDishService.createNewSideDishService(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.error(error); // Kiểm tra lỗi
    return res.status(500).json({
      message: "Error creating side dish",
      error: error.message,
    });
  }
};


let getAllSideDish = async (req, res) => {
  try {
    let id = req.query.id;

    let sideDishes = await sideDishService.getAllSideDishService(id);

    return res.status(200).json({
      errCode: 0,
      errMessage: "You got side dishes successfully",
      sideDishes,
    });
  } catch (error) {
    console.error("Error fetching side dishes:", error);  // Log lỗi nếu có
    return res.status(500).json({
      message: "Error fetching side dishes",
      error,
    });
  }
};

let deleteSideDish = async (req, res) => {
  let data = req.body.id
  console.log('check data', data)
  let message = await sideDishService.deleteSideDishService(data)

  return res.status(200).json(message)
}

module.exports = {
  createNewSideDish,
  getAllSideDish,
  deleteSideDish
};
