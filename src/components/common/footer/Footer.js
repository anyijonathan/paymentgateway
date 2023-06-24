import { Link, useNavigate } from "react-router-dom";
import "./index.css";

import { ICONS, IMAGES } from "../../../assets";

const Footer = () => {
  const navigate = useNavigate();

  const usefulLinks = [
    {
      name: "Docs",
      path: "/documentation",
    },
    {
      name: "FAQs",
      path: "/faqs",
    },
    {
      name: "Terms & Conditions",
      path: "/terms-and-conditions",
    },
  ];
  return (
    <div className="footer-container">
      <div className="useful-info">
        <div className="left-side">
          <div className="logo">
            <img
              src={IMAGES.logo}
              alt="FCMB Logo"
              onClick={() => navigate("/")}
            />
          </div>

          <p className="short-desc">Easy payments with FCMB Payment Gateway</p>
        </div>
        <div className="right-side">
          <div className="useful-links">
            <h3 className="title">USEFUL LINKS</h3>
            <div className="links">
              {usefulLinks.map((link, index) => {
                return (
                  <Link className="link" key={index} to={link.path}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="contact-us">
            <h3 className="title">CONTACT US</h3>
            <div className="contact-links">
              <div className="contact-link">
                <img src={ICONS.phone} alt="phone" />
                <span>01-658393</span>
              </div>
              <div className="contact-link">
                <img src={ICONS.mailOutlined} alt="mail" />
                <span>
                  <a href="mailto:smehelpdesk@fcmb.com">smehelpdesk@fcmb.com</a>
                </span>
              </div>
            </div>
            <div className="socials">
              <a
                target="_blank"
                rel="noreferrer"
                className="social-link"
                href="/"
              >
                <img src={ICONS.mailFill} alt="mail" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="social-link"
                href="/"
              >
                <img src={ICONS.twitter} alt="twitter" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="social-link"
                href="/"
              >
                <img src={ICONS.instagram} alt="instagram" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className="social-link"
                href="/"
              >
                <img src={ICONS.facebook} alt="facebook" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright">
        <span>Powered by </span>
        <Link to="/" className="fcmb-link">
          First City Monument Bank (FCMB)
        </Link>
      </p>
    </div>
  );
};

export default Footer;
