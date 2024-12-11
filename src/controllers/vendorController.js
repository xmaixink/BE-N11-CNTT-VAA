import verndorService from "../services/vendorService"

let resgisterNewVendor = async (req, res) => {
      let message = await verndorService.resgisterNewVendorService(req.body);

      return res.status(200).json(message)
}

let getAllVendors = async (req, res) => {
      let id = req.query.id

      if (!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing required parameters user",
                  vendors: []
            })
      }
      let vendors = await verndorService.getAllVendorsService(id)
      return res.status(200).json({
            errCode: 0,
            errMessage: "You get user succeed",
            vendors
      })
}

let handleVendorLogin = async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;

      if (!email || !password) {
            return res.status(500).json({
                  errCode: 1,
                  message: "Missing inputs parameters",
            });
      }

      let vendorData = await verndorService.vendorLoginService(email, password);

      return res.status(200).json({
            errCode: vendorData.errCode,
            message: vendorData.message,
            vendor: vendorData.vendorData ? vendorData.vendorData : {},
      });
};

let verifyRegisterVendor = async (req, res) => {
      let message = await verndorService.verifyRegisterVendorService(req.body);

      return res.status(200).json(message)
}


module.exports = {
      resgisterNewVendor, getAllVendors, verifyRegisterVendor, handleVendorLogin
};