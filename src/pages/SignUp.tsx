import { Link } from "react-router-dom";
import Button1 from "../components/custom-ui/Button-1";

export default function SignUp() {
  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-headline">Sign Up</div>
        <div className="signup-cta">
          <Link to={"/membership"}>
            <Button1 title="Get Started" bgColor="app_primary-electricBlue" />
          </Link>
        </div>
      </div>
    </div>
  );
}
