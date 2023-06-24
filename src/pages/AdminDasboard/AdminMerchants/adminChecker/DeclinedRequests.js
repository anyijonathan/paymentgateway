import CheckerStatus from "./status/CheckerStatus";

const DeclinedRequests = () => {
  return (
    <CheckerStatus
      status="declined"
      action={false}
      title="Declined Requests"
      search={true}
    />
  );
};

export default DeclinedRequests;
