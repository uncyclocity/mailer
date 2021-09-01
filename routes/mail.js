const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const mailSender = {
  sendGmail: function (param) {
    console.log("이메일 전송 프로세스 시작");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      host: "smtp.gmlail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass,
      },
    });

    var mailOptions = {
      from: senderInfo.user,
      to: param.toEmail,
      subject: param.subject,
      html: param.html,
      attachments: param.attachments,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        console.log("이메일 전송 프로세스 비정상 종료");
      } else {
        // console.log("Email sent: " + info.response);
        // console.log("이메일 전송 프로세스 종료(1분 후 서버가 닫힙니다.)");
        process.exit(0);
      }
    });
  },
};

module.exports = mailSender;
