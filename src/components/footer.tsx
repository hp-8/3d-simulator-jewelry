import React from "react";
import { FaRegCopyright, FaFacebookSquare, FaTwitter, FaInstagram } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import '../styles/footer.css'

interface FooterProps {} // Empty interface for now

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="company-info">
          <p>Garv Jewels by HP Creates</p>
          <span>
            <FaRegCopyright /> {new Date().getFullYear()}
          </span>
        </div>
    
        <div className="social-media">
          <a href="#">
            <FaFacebookSquare />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>
          
        <div className="policies">
          <a href="#">
            Privacy Policy
          </a>
          <a href="#">
            Return and Refund Policy
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;