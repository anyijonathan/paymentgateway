import CheckerStatus from "./status/CheckerStatus";

const ApprovedRequests = () => {
  return (
    <CheckerStatus
      status="approved"
      action={false}
      title="Approved Requests"
      search={true}
    />
  );
};

export default ApprovedRequests;
