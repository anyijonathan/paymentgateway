import React from "react";
import LayoutContainer from "./layoutContainer/LayoutContainer";
import LayoutMenu from "./layoutMenu/LayoutMenu";
import LayoutPageContent from "./layoutPageContent/LayoutPageContent";
import LayoutPageNav from "./layoutPageNav/LayoutPageNav";

const DashboardLayout = (props) => {
  return (
    <LayoutContainer>
      <LayoutMenu type={props.type} />
      <div className="layout-page w-full h-[100vh]">
        <LayoutPageNav />
        <LayoutPageContent>{props.children}</LayoutPageContent>
      </div>
    </LayoutContainer>
  );
};

export default DashboardLayout;
