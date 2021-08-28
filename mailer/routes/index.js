const express = require("express");
const router = express.Router();
const mailer = require("./mail");
const phantom = require("phantom");
const schedule = require("node-schedule");
const emails = require("../emails.json");

router.get("/", function (req, res) {
  res.send("mailer가 정상적으로 작동중입니다 😉");
});

schedule.scheduleJob("0 0 8 * * *", async () => {
  console.log("이메일 전송 프로세스 시작");

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
      return _page.render("today.png");
    })
    .then((status) => {
      return _page.close();
    })
    .then((status) => {
      return _ph.exit();
    });

  let emailParam = {
    toEmail: emails,
    subject: "nodemailer 테스트",
    html: "<img src='cid:today' width='800px'>",
    attachments: [
      {
        filename: "today.png",
        path: "./today.png",
        cid: "today",
      },
    ],
  };

  mailer.sendGmail(emailParam);

  console.log("이메일 전송 프로세스 종료(수 초 후 전송 예정입니다.)");
});

module.exports = router;
