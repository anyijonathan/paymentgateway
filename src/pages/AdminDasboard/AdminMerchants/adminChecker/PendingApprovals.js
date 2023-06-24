import CheckerStatus from "./status/CheckerStatus";

const PendingApprovals = () => {
  return (
    <CheckerStatus
      status="pending"
      title="Pending Approvals"
      search={true}
      action={true}
      actionsType="default"
    />
  );
};

export default PendingApprovals;
