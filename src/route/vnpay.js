const express = require("express");
const router = express.Router();
const moment = require("moment");
const config = require("config");
const crypto = require("crypto");
const qs = require("qs");

router.post("/create_payment_url", function (req, res, next) {
      process.env.TZ = "Asia/Ho_Chi_Minh";

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

      let config = require("config");

      let tmnCode = config.get("vnp_TmnCode");
      let secretKey = config.get("vnp_HashSecret");
      let vnpUrl = config.get("vnp_Url");
      let returnUrl = config.get("vnp_ReturnUrl");
      let orderId = moment(date).format("DDHHmmss");
      let amount = req.body.amount;
      let bankCode = req.body.bankCode;

      let locale = req.body.language;
      if (locale === null || locale === "") {
            locale = "vn";
      }
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = sortObject(vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      console.log("check vnpay");

      res.send(vnpUrl);
});

function sortObject(obj) {
      let sorted = {};
      let str = [];
      let key;
      for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                  str.push(encodeURIComponent(key));
            }
      }
      str.sort();
      for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
      }
      return sorted;
}

router.get("/vnpay_return", function (req, res, next) {
      let vnp_Params = req.query;
      let secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);

      let tmnCode = config.get("vnp_TmnCode");
      let secretKey = config.get("vnp_HashSecret");

      let signData = qs.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
            const redirectToPaymentSuccessPage = (status) => `
            <html>
            <head>
                <meta http-equiv="refresh" content="0; url=http://localhost:3000/order">
            </head>
            <body>
                <p>Redirecting to payment ${status} page...</p>
            </body>
            </html>
        `;

            let orderStatus =
                  vnp_Params["vnp_ResponseCode"] === "00" ? "success" : "error";

            if (orderStatus === "success") {
                  res.redirect(`http://localhost:3000/order?type=${orderStatus}`);
                  res.status(200).send(redirectToPaymentSuccessPage("success"));
            } else {
                  res.redirect(`http://localhost:3000/order?type=false`);
                  res.status(200).send(redirectToPaymentSuccessPage("error"));
            }
      } else {
            res.status(400).send("Invalid signature");
      }
});

module.exports = router;