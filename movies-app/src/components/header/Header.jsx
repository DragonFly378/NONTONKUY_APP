import React from "react";
import { useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

/* css */
import "./header.scss";

/* attr */
import logo from "../../assets/tmovie.png";
import { cleanup } from "@testing-library/react";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header-wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">NontonSkuy</Link>
        </div>
        <ul className="header-nav">
          {headerNav.map((nav, navIdx) => (
            //console.log(navIdx, active, pathname),
            <li key={navIdx} className={`${navIdx === active ? "active" : ""}`}>
              <Link to={nav.path}>{nav.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
