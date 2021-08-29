import Box from "./style/box";
import styled from "styled-components";
import { AiOutlineClose, AiOutlinePlayCircle } from "react-icons/ai";
import { CgUserlane } from "react-icons/cg";
import instance from "./pages/api/api";
import AddMenu from "./AddMenu";
import { useState } from "react";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  border-radius: 15px 15px 0 0;
  padding: 0 20px;

  background: #fd7e00;
  color: white;

  .hello_und_isRun_area {
    flex-direction: column;
    width: 100%;
    .hello {
      width: 100%;

      font-size: 20px;
      font-weight: bold;
    }

    .isrun_longtext {
      width: 100%;

      font-size: 20px;
      font-weight: bold;
    }
  }

  .switch_area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 15%;

    .isrun_icon {
      font-size: 25px;
    }

    .isrun_text {
      font-size: 13px;
    }
  }
`;

const SettingArea = styled.div`
  height: 100%;

  ul {
    li {
      margin-top: 20px;
      position: relative;
      right: 15px;
      list-style-type: none;

      &:not(:last-child) {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 20px;
      }

      .setting_title {
        font-weight: bold;
        color: #565656;
      }

      .input_area {
        display: flex;
        flex-direction: row;
        margin-top: 10px;

        .setting_input {
          padding: 8px;
          border: none;
          background: #e9ecef;
          width: 85%;
          border-radius: 5px;

          &:focus {
            outline: none;
          }
        }

        .setting_savebtn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
          color: #fd7e00;
          cursor: pointer;
        }
      }

      .receiver_arr_area {
        display: flex;
        flex-direction: column;
        margin-top: 10px;

        .receiver_area {
          display: flex;
          flex-direction: row;

          .profile_photo {
            font-size: 35px;
            color: #fd7e00;
          }

          .name_und_email_area {
            margin-left: 10px;

            .name {
              font-size: 14px;
              color: #565656;
            }

            .email {
              font-size: 13px;
              font-weight: bold;
              font-family: Helvetica;
              color: #fd7e00;
            }
          }
        }
        .setting_addbtn {
          display: flex;
          align-items: center;
          color: #fd7e00;
          cursor: pointer;
        }
      }
    }
  }
`;

const postSettings = (nowdata, setter, key, value) => {
  instance({
    method: "POST",
    url: "/api/updateSettings",
    data: {
      ...nowdata,
      key: value,
    },
  }).then((data) => {
    console.log(data);
    //setter(data);
  });
};

export default async function SettingBox() {
  const [settings, setSettings] = useState(
    await instance.get("/api/getSettings")
  );
  console.log(settings);
  const isRunServer = settings.isRunServer;
  const URL = settings.URL;
  const receiver = settings.receiver;

  return (
    <Box>
      <Title>
        <div className="hello_und_isRun_area">
          <div className="hello">안녕하세요!🤗</div>
          <div className="isrun_longtext">
            {isRunServer
              ? "서버가 정상적으로 작동중입니다 :)"
              : "서버가 꺼진 상태입니다"}
          </div>
        </div>
        <div className="switch_area">
          {isRunServer ? (
            <div
              onClick={() =>
                postSettings(settings, setSettings, isRunServer, false)
              }
            >
              <div className="isrun_icon">
                <AiOutlineClose />
              </div>
              <div className="isrun_text">서버 끄기</div>
            </div>
          ) : (
            <div
              onClick={() =>
                postSettings(settings, setSettings, isRunServer, true)
              }
            >
              <div className="isrun_icon">
                <AiOutlinePlayCircle />
              </div>
              <div className="isrun_text">서버 켜기</div>
            </div>
          )}
        </div>
      </Title>
      <SettingArea>
        <ul>
          <li>
            <div className="setting_title">스크린 샷 대상 웹 페이지</div>
            <div className="input_area">
              <input type="text" className="setting_input" value={URL}></input>
              <div className="setting_savebtn">저장하기</div>
            </div>
          </li>
          <li>
            <div className="setting_title">이메일을 받는 주소 목록</div>
            <div className="receiver_arr_area">
              {receiver.map((user, index) => (
                <div className="receiver_area">
                  <div className="profile_photo">
                    <CgUserlane />
                  </div>
                  <div className="name_und_email_area">
                    <div className="name">{user.name}</div>
                    <div className="email">{user.email}</div>
                  </div>
                </div>
              ))}
              <div className="add_email_area">
                <AddMenu />
              </div>
            </div>
          </li>
        </ul>
      </SettingArea>
    </Box>
  );
}
