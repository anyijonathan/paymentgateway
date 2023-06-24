import { ICONS } from "../../../assets";

const NoMerchant = (props) => {
  return (
    <div className="no-merchant py-[3rem] flex justify-center items-center flex-col border-t border-[#ededf3]">
      <img src={ICONS.noData} alt="empty folder" />
      {!props.createMerchant && (
        <p>
          Record does not exist.{" "}
          <button
            className="text-purple font-medium hover:underline"
            onClick={props.refresh}
          >
            Refresh
          </button>
        </p>
      )}
      {props.createMerchant && (
        <p>
          Record does not exist. To add to please{" "}
          <button
            className="text-purple font-medium hover:underline"
            onClick={props.createMerchant}
          >
            Create Merchant
          </button>
          .
        </p>
      )}
    </div>
  );
};

export default NoMerchant;
