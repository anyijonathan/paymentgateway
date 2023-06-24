import { useOutletContext } from "react-router-dom";
import MakerStatus from "./status/MakerStatus";

const MakerPending = () => {
  const ref = useOutletContext();
  return (
    <MakerStatus anchor={ref} status="pending" title="Pending Approvals" />
  );
};

export default MakerPending;
