import "./index.css";

const LayoutPageContent = (props) => {
  return (
    <div className="layout-page-content ">
      <div className="wrapper py-6 px-4 md:px-5 xl:pl-6 xl:pr-5 h-full overflow-y-auto">
        <div className="content-container overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
};

export default LayoutPageContent;
