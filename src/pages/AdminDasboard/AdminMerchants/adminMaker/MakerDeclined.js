import { useOutletContext } from "react-router-dom";
import MakerStatus from "./status/MakerStatus";

const MakerDeclined = () => {
  const ref = useOutletContext();
  return (
    <MakerStatus
      anchor={ref}
      noSub
      status="declined"
      title="Declined Requests"
    />
  );
};

export default MakerDeclined;
