const express = require("express");
const router = express.Router();
const mailer = require("./mail");
const phantom = require("phantom");
const emails = require("../emails_test.json");
const renderURL = "http://www.shift.co.kr/";
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

let emailParam = {
  toEmail: emails,
  subject: `${moment().format("MM/DD")}일자 ${renderURL} 현황`,
  html: `<div><b>${moment().format(
    "YYYY년 MM월 DD일 HH시 mm분"
  )} ${renderURL}</b> 웹페이지의 현황입니다.</div><img src='cid:today' width='800px'>`,
  attachments: [
    {
      filename: "today.png",
      path: `../../incompanyproject/mailer/screenshot/screenshot_${moment().format(
        "YYMMDD"
      )}.png`,
      cid: "today",
    },
  ],
};

router.get("/", function (req, res) {
  res.send("mailer가 정상적으로 작동중입니다 😉");
});

const sendProcess = async () => {
  try {
    console.log("스크린 샷 생성 프로세스 시작");

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
        return _page.open(renderURL);
      })
      .then((status) => {
        return _page.render(
          `../../../incompanyproject/mailer/screenshot/screenshot_${moment().format(
            "YYMMDD"
          )}.png`
        );
      })
      .then((status) => {
        return _page.close();
      })
      .then((status) => {
        return _ph.exit();
      });
    console.log("스크린샷 생성 프로세스 종료");
    mailer.sendGmail(emailParam);
  } catch (e) {
    console.error(e);
  }
};

sendProcess();

module.exports = router;
