import { useNavigate } from "react-router-dom";
import "../App.css"

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navList">
        <h2>CruxCV</h2>

        <div className="navbtn">
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            CruxCv
          </h1>
        </div>
        <div>
          <p> AI-powered resume analysis to help you crack interviews faster.</p>
        </div>
        <button className="btn" onClick={() => navigate("/signup")}>
          Get Started
        </button>
        
      </div>
    </div>
    
  );
}
