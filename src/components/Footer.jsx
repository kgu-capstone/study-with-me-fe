import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

function FOOT() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-icon-line">
          <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
          <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
          <FontAwesomeIcon icon={faFacebookF} className="footer-icon" />
        </div>

        <div className="footer-second-line">
          <a href="#" className="footer-second-line-items">
            Home
          </a>
          <a href="#" className="footer-second-line-items">
            About
          </a>
          <a href="#" className="footer-second-line-items">
            Contact
          </a>
        </div>
        <div>© 2023 여기서 구해볼래</div>
      </div>
    </footer>
  );
}

export default FOOT;
