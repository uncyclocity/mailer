import { SiMailDotRu } from "react-icons/si";
import StHeader from "./style/StHeader";

export default function Header() {
  return (
    <StHeader>
      <div className="logo_area">
        <div className="logo_icon">
          <SiMailDotRu />
        </div>
        <div className="logo_text">Cloale</div>
      </div>
    </StHeader>
  );
}
