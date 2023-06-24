import { Breadcrumbs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomBreadcrumbs = (props) => {
  const navigate = useNavigate();
  const page = props.page;
  const getView = (page) => {
    switch (page) {
      case "view":
        return "All Merchants";
      case "pending":
        return "Pending Approvals";
      case "declined":
        return "Declined Requests";
      case "pending-deletion":
        return "Pending Deletion";
      default:
        return "Referred Merchants";
    }
  };

  const view = getView(page);
  return (
    <Breadcrumbs
      separator=">"
      sx={{
        fontSize: "14px",
        fontFamily: "General Sans",
        letterSpacing: "0.02em",
      }}
    >
      <p
        underline="hover"
        color="inherit"
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      >
        {view}
      </p>

      <Typography
        color="primary"
        sx={{
          fontSize: "14px",
          fontFamily: "General Sans",
          fontWeight: 500,
        }}
      >
        {props.accountNumber}
      </Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
