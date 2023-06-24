import { useEffect, useMemo, useState } from "react";
import {
  matchRoutes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

const MerchantCheckerTab = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const nameUrl = useLocation();
  const route = useMemo(() => [{ path: "/staff/merchant/checker/" }], []);

  useEffect(() => {
    if (matchRoutes(route, nameUrl)) {
      setOpen(false);
      navigate("view", { replace: true });
    }
  }, [nameUrl, navigate, route]);

  const handleSection = () => {
    setOpen(true);
    navigate("pending-approvals");
  };

  const handleBack = () => {
    setOpen(false);
    navigate("view", { replace: true });
  };
  return (
    <>
      <div className="dashboard-navigation mb-10">
        {!open && (
          <div className="links">
            <NavLink className="link" to="view" onClick={() => setOpen(false)}>
              All Merchants
            </NavLink>
            <button className="link" onClick={handleSection}>
              Approve Merchants
            </button>
            <NavLink
              className="link"
              to="deletion"
              onClick={() => setOpen(false)}
            >
              Approve Merchants Deletion
            </NavLink>
          </div>
        )}
        {open && (
          <>
            <button
              className="text-xs hover:text-purple font-light"
              onClick={handleBack}
            >
              {"< All Merchants"}
            </button>
            <div className="links mt-4">
              <NavLink className="link" to="pending-approvals">
                Pending Requests
              </NavLink>
              <NavLink className="link" to="approved">
                Approved Requests
              </NavLink>
              <NavLink className="link" to="declined-requests">
                Declined Requests
              </NavLink>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MerchantCheckerTab;
