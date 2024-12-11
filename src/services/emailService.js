require("dotenv").config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
      let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, //true for 465, false for other ports
            auth: {
                  user: process.env.EMAIL_APP_USER,
                  pass: process.env.EMAIL_APP_PASSWORD,
            },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
            from: '"Hoang Son 3000 👻" <vuhoangson3000@gmail.com>', // sender address
            to: dataSend.reciverEmail, // list of receivers
            subject: "Xác thực tài khoản đăng ký với tư cách nhà cung cấp ", // Subject line	
            html: `
                  <h3>Xin chào ${dataSend.nameVendor}</h3> 
                  <p>Bạn đã đăng ký với vai trò là nhà cung cấp hãy xác nhận bằng cách click vào đường link sau 
                        <a href=${dataSend.redirectLink} target="_blank" >C lick here</a>
                  </p>
                  <p>Với số điện thoại bạn đã đăng ký là <h5>${dataSend.phoneNumber}</h5></p>
                  <p>Nếu bạn không đăng ký dịch vụ nào bên chúng tôi, xin hãy bỏ qua email này</p>

                  <div>
                  Xin cảm ơn bạn đã lựa chọn sàn thương mại của chúng tôi là nơi cung cấp dịch vụ     
                  </div>
            `,
      });
}

module.exports = {
      sendSimpleEmail
};