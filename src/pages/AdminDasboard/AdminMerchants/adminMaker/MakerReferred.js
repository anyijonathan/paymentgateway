import { useOutletContext } from "react-router-dom";
import MakerStatus from "./status/MakerStatus";

const MakerReferred = () => {
  const ref = useOutletContext();
  return (
    <MakerStatus anchor={ref} status="referred" title="Referred Merchants" />
  );
};

export default MakerReferred;
