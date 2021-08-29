import { RiMailSendLine } from "react-icons/ri";
import StHeader from "./style/StHeader";

export default function Header() {
  return (
    <StHeader>
      <div className="logo_area">
        <div className="logo_icon">
          <RiMailSendLine />
        </div>
        <div className="logo_text">Cloale</div>
      </div>
    </StHeader>
  );
}
