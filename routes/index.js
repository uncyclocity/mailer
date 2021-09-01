const express = require("express");
const router = express.Router();
const mailer = require("./mail");
const phantom = require("phantom");
const renderURL = "http://www.shift.co.kr/";
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

// 이메일 요소
const emails = require("../emails_test.json");
let email_subject = `${moment().format("MM/DD")}일자 ${renderURL} 현황`;
let email_html = `<div><b>${moment().format(
  "YYYY년 MM월 DD일 HH시 mm분"
)} ${renderURL}</b> 웹페이지의 현황입니다.</div><img src='cid:today' width='800px'>`;
let email_attachments = [
  {
    filename: "today.png",
    path: `../../incompanyproject/mailer/screenshot/screenshot_${moment().format(
      "YYMMDD"
    )}.png`,
    cid: "today",
  },
];

// mailSender.sendGmail 함수에 전달 될 파라미터
let emailParam = {
  toEmail: emails,
  subject: email_subject,
  html: email_html,
  attachments: email_attachments,
};

router.get("/", function (req, res) {
  res.send("mailer 서버 작동 중...");
});

// 서버 가동 시 실행되는 함수
const sendProcess = async () => {
  try {
    console.log("스크린 샷 생성 프로세스 시작");

    // 보이지 않는 브라우저 phantomJS를 통한
    // 웹 페이지 캡쳐 및 파일로 저장
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

    // 이메일 전송 역할의 sendGmail을 실행
    mailer.sendGmail(emailParam);
  } catch (e) {
    console.error(e);
  }
};

sendProcess();

module.exports = router;
