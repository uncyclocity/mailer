const nodemailer = require("nodemailer");
const senderInfo = require("../config/senderInfo.json");

const mailSender = {
  sendGmail: function (param) {
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
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = mailSender;
