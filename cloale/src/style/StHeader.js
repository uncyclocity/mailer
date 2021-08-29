import styled from "styled-components";

const Styles = styled.div`
  .logo_area {
    display: flex;
    flex-direction: row;

    .logo_icon {
      color: #fd7e00;
      font-size: 50px;
      margin-top: 2.5px;
      margin-right: 10px;
    }

    .logo_text {
      color: #fd7e00;
      font-size: 50px;
      font-weight: bold;
      font-family: Helvetica;
    }
  }
`;

export default function StHeader({ children }) {
  return <Styles>{children}</Styles>;
}
