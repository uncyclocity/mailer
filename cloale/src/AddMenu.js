import { useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  .addMenu0 {
    height: 32px;

    .addbtn0 {
      width: 56px;
      height: 100%;
      display: flex;
      align-items: center;
      color: #fd7e00;
      cursor: pointer;
    }
  }

  .addMenu1 {
    display: flex;
    flex-direction: row;

    .add_input {
      padding: 8px;
      border: none;
      background: #e9ecef;
      width: 40%;
      border-radius: 5px;

      &:focus {
        outline: none;
      }
    }

    .addbtn1 {
      display: flex;
      align-items: center;
      color: #fd7e00;
      cursor: pointer;
      margin-left: 10px;
    }

    .cancelbtn {
      display: flex;
      align-items: center;
      color: grey;
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;

export default function AddMenu() {
  const [isOpenAddMenu, setIsOpenAddMenu] = useState(false);

  return (
    <Styles>
      {isOpenAddMenu ? (
        <div className="addMenu1">
          <input
            type="text"
            className="add_input"
            placeholder="이름을 입력하세요"
          />
          &nbsp;
          <input
            type="text"
            className="add_input"
            placeholder="이메일 주소를 입력하세요"
          />
          <div className="addbtn1" onClick={() => {}}>
            추가
          </div>
          <div
            className="cancelbtn"
            onClick={() => setIsOpenAddMenu(!isOpenAddMenu)}
          >
            취소
          </div>
        </div>
      ) : (
        <div className="addMenu0">
          <div
            className="addbtn0"
            onClick={() => setIsOpenAddMenu(!isOpenAddMenu)}
          >
            추가하기
          </div>
        </div>
      )}
    </Styles>
  );
}
