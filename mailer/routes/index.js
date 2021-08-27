var express = require("express");
var router = express.Router();
const mailer = require("./mail");

/* GET home page. */
router.get("/mail", function (req, res, next) {
  const { email } = req.body;

  console.log(req.body);

  let emailParam = {
    toEmail: email,
    subject: "nodemailer 테스트",
    text: "성공!",
  };

  mailer.sendGmail(emailParam);

  res.status(200).send("성공");
});

module.exports = router;
