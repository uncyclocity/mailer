var express = require("express");
var router = express.Router();
const mailer = require("./mail");
const phantom = require("phantom");

/* GET home page. */
router.get("/mail", async function (req, res, next) {
  const { email } = req.body;

  await phantom
    .create()
    .then((ph) => {
      _ph = ph;
      return _ph.createPage();
    })
    .then()
    .then((page) => {
      _page = page;
      _page.property("viewportSize", { width: 1920, height: 1000 });
      return _page.open("http://www.shift.co.kr/");
    })
    .then((status) => {
      return _page.render("test.png");
    })
    .then((status) => {
      return _page.close();
    })
    .then((status) => {
      return _ph.exit();
    });

  let emailParam = {
    toEmail: email,
    subject: "nodemailer 테스트",
    text: "성공!",
  };

  mailer.sendGmail(emailParam);

  res.status(200).send("성공");
});

module.exports = router;
