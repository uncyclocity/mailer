const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");
var cnt = 0;
var tmpCnt = 0;

const mailSender = {
  sendShiftMail: async function (param) {
    console.log("이메일 전송 프로세스 시작");

    // 메일 서비스, 포트 번호, 호스트, 보내는 이의 ID/PW 등의 내용이 저장되고,
    // 이 내용을 통해 이메일을 전송하는 역할의 객체
    var transporter = nodemailer.createTransport({
      host: "mail.shift.co.kr",
      secure: false,
      requireTLS: true,
      port: 425,
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
    // 오류가 뜨면 최대 5번까지 재실행한다.
    while (cnt < 5) {
      try {
        tmpCnt = cnt;
        await transporter.sendMail(mailOptions);
      } catch (e) {
        cnt++;
        console.log("이메일 전송 프로세스 비정상 종료");
        console.error(e);
        if (cnt >= 5) {
          process.exit(1);
        } else {
          console.log("재실행 중...");
        }
      } finally {
        if (cnt === tmpCnt) {
          console.log("이메일 전송 프로세스 종료");
          process.exit(0);
        }
      }
    }
  },
};

module.exports = mailSender;
