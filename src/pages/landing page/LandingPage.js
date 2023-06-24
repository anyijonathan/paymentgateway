import "./index.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ICONS } from "../../assets";
import { IMAGES } from "../../assets";
import { FeatureCard } from "./general/FeatureCard";
import Header from "../../components/common/header/Header";
import Inner from "../../layouts/inner landing page/Inner";
import Footer from "../../components/common/footer/Footer";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state?.userAuth?.isLoggedIn);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const features = [
    {
      icon: ICONS.seamless,
      title: "Seamless",
      subtitle:
        "With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment. With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment.",
    },
    {
      icon: ICONS.secure,
      title: "Secure",
      subtitle:
        "With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment. With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment.",
    },
    {
      icon: ICONS.speed,
      title: "Speed",
      subtitle:
        "With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment. With customers opting for digital payments, FCMB payment gateway accepts a multitude of payment.",
    },
  ];
  const tabInfo = [
    {
      id: 1,
      name: "Multiple Payment Options",
      desc: "FCMB payment gateway accepts a multitude of payment options such as debit/credit cards, USSD, and rewards which helps in gaining their confidence.",
      icon: ICONS.payment,
    },
    {
      id: 2,
      name: "Detailed Reporting",
      desc: "FCMB payment gateway accepts a multitude of payment options such as debit/credit cards, USSD, and rewards which helps in gaining their confidence.",
      icon: ICONS.report,
    },
    {
      id: 3,
      name: "Streamlined Invoicing",
      desc: "FCMB payment gateway accepts a multitude of payment options such as debit/credit cards, USSD, and rewards which helps in gaining their confidence.",
      icon: ICONS.invoice,
    },
  ];
  const setTabHandler = (e) => {
    setActiveTab(parseInt(e.target.id) - 1);
  };

  return (
    <div className="landing_page-container">
      <div className="header-area">
        <Header />
      </div>
      <section className="banner">
        <div className="banner-text">
          <h1 className="main">An easier way to accept payments </h1>
          <p className="sub">
            With the FCMB payment gateway, merchants can conveniently accept
            payments, control finances, and track transactions{" "}
          </p>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "250px",
              height: "50px",
              marginTop: "40px",
              fontSize: "16px",
              background: "theme.palette.secondary.main",
            }}
            className="gradient"
            onClick={() => navigate("/login")}
          >
            {isLoggedIn ? "Dashboard" : "Sign In"}
          </Button>
        </div>
        <div className="banner-image">
          <div className="lady-image">
            <img src={IMAGES.ladyInRed} alt="lady in a red dress" />
          </div>
          <div className="payment-image">
            <img src={IMAGES.MCPay} alt="mastercard payment" />
          </div>
        </div>
      </section>
      <section className="key-features">
        <Inner>
          <h1 className="main">
            Enabling merchants handle payments without hassle
          </h1>
          <div className="features-list">
            {features.map((feature, index) => {
              return (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              );
            })}
          </div>
        </Inner>
      </section>
      <section className="tab-info">
        <Inner>
          <h1 className="main">
            With customers opting for digital payments, FCMB payment gateway
            accepts a multitude of payment.
          </h1>
          <div className="tab-section">
            <div className="controllers">
              {tabInfo.map((tab) => {
                return (
                  <p
                    key={tab.id}
                    id={tab.id}
                    className={`controller ${
                      activeTab + 1 === tab.id ? "active-controller" : ""
                    }`}
                    onClick={setTabHandler}
                  >
                    {tab.name}
                  </p>
                );
              })}
            </div>
            <div className="information">
              <div className="info-details">
                <p className="text">{tabInfo[activeTab].desc}</p>
                <div className="graphic">
                  <img
                    src={tabInfo[activeTab].icon}
                    alt={tabInfo[activeTab].name}
                  />
                </div>
              </div>
            </div>
          </div>
        </Inner>
      </section>
      <section className="call-to-action">
        <Inner>
          <div className="box">
            <div className="info">
              <h1 className="main">Start accepting payments with ease</h1>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: "200px",
                  height: "50px",
                  fontSize: "16px",
                  boxShadow: "none",
                }}
                onClick={() => navigate("/login")}
              >
                {isLoggedIn ? "Dashboard" : "Sign In"}
              </Button>
            </div>
            <div className="design">
              <img src={ICONS.design} alt="design patterns" />
            </div>
          </div>
        </Inner>
      </section>
      <section className="footer-area">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
