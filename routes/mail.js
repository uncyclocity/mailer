const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const mailSender = {
  sendShiftMail: function (param) {
    console.log("이메일 전송 프로세스 시작");

    // 메일 서비스, 포트 번호, 호스트, 보내는 이의 ID/PW 등의 내용이 저장되고,
    // 이 내용을 통해 이메일을 전송하는 역할의 객체
    var transporter = nodemailer.createTransport({
      host: "mail.shift.co.kr",
      secure: false,
      requireTLS: true,
      port: 25,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 메일 요소(보내는이, 받는이, 제목, 내용, 첨부파일) 객체
    var mailOptions = {
      from: senderInfo.user,
      to: param.toEmail,
      subject: param.subject,
      html: param.html,
      attachments: param.attachments,
    };

    // 이메일 전송 부분
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        console.log("이메일 전송 프로세스 비정상 종료");
      } else {
        console.log(info);
        process.exit(0);
      }
    });
  },
};

module.exports = mailSender;
