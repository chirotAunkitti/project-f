import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import "./Navbar.css";

function Navbar({
  scrollToServices,
  scrollToPortfolio,
  scrollToAbout,
  scrollToContact,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      const servicesSection = document.getElementById("services");
      const portfolioSection = document.getElementById("portfolio");
      const aboutSection = document.getElementById("about");
      // const contactSection = document.getElementById('contact');

      if (
        window.scrollY >= servicesSection.offsetTop &&
        window.scrollY < portfolioSection.offsetTop
      ) {
        setActiveSection("services");
      } else if (
        window.scrollY >= portfolioSection.offsetTop &&
        window.scrollY < aboutSection.offsetTop
      ) {
        setActiveSection("portfolio");
      } else if (
        window.scrollY >= aboutSection.offsetTop &&
        window.scrollY < aboutSection.offsetTop
      ) {
        setActiveSection("about");
        // } else if (window.scrollY >= contactSection.offsetTop) {
        //   setActiveSection('contact');
      } else {
        setActiveSection("");
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo">Screw D</div>
      <nav>
        <ul>
          <li
            className={activeSection === "services" ? "active" : ""}
            onClick={scrollToServices}
          >
            SERVICES
          </li>
          <li
            className={activeSection === "portfolio" ? "active" : ""}
            onClick={scrollToPortfolio}
          >
            PORTFOLIO
          </li>
          {/* <li
            className={activeSection === "about" ? "active" : ""}
            onClick={scrollToAbout}
          >
            ABOUT
          </li> */}
          {/* <li className={activeSection === 'contact' ? 'active' : ''} onClick={scrollToContact}>CONTACT</li> */}
          <li>
            <Link to="/order" className="order-link">
              ORDER
            </Link>
          </li>
          {/* <li>
             <Link to="/document" className="document-link">
            DOCUMENT
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
