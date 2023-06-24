import CheckerStatus from "./status/CheckerStatus";

const MerchantDeletion = () => {
  return (
    <CheckerStatus
      status="pending-deletion"
      title="Approve Merchants Deletion"
      action={true}
      actionsType="delete"
    />
  );
};

export default MerchantDeletion;
