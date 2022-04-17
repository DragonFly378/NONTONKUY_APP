import React from "react";
import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/tmovie.png";

const Footer = () => {
  return (
    <>
      <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
        <div className="footer-content container">
          <div className="footer-content-logo">
            <div className="logo">
              <img src={logo} alt="" />
              <Link to="/">NontonSkuy</Link>
            </div>
          </div>
          <div className="footer-content-menus">
            <div className="footer-content-menu">
              <Link to="/">Home</Link>
              <Link to="/">Contact Us</Link>
              <Link to="/">Term of services</Link>
              <Link to="/">About us</Link>
            </div>
            <div className="footer-content-menu">
              <Link to="/">Live</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">Premium</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
            <div className="footer-content-menu">
              <Link to="/">You must Watch</Link>
              <Link to="/">Recent Release</Link>
              <Link to="/">Top IMDB</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
