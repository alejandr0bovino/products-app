import React from "react";
import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import { SiReactos } from "react-icons/si";
import { RiFacebookCircleLine } from "react-icons/ri";

function Footer() {
  return (
    <footer className="theme-footer mt-auto">
      <div className="theme-footer__inner container">
        <div className="theme-footer__left">
          <SiReactos size="1.5rem" />
          &nbsp;&nbsp; © 2022 Company, Inc
        </div>

        <ul className="theme-footer__menu">
          <li>
            <Link to="/" className="btn">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="btn">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/help" className="btn">
              Help
            </Link>
          </li>
        </ul>

        <div className="theme-footer__right">
          <ul>
            <li>
              <a href="#" className="btn">
                <FiTwitter size="1.25rem" />
              </a>
            </li>

            <li>
              <a href="https://github.com/alejandr0bovino/products-app" className="btn" target="_blank">
                <FiGithub size="1.25rem" />
              </a>
            </li>

            <li>
              <a href="#" className="btn">
                <FiInstagram size="1.25rem" />
              </a>
            </li>

            <li>
              <a href="#" className="btn">
                <RiFacebookCircleLine size="1.5rem" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
