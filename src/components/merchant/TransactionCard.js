import "./index.css";

import { ICONS } from "../../assets";
import { numberWithCommas } from "../../utils/helperFunctions";

const TransactionCard = (props) => {
  return (
    <div className="transactions_card-container">
      <div className="overview">
        <div className="title-section">
          <div
            className={`indicator ${
              props.title.includes("Failed") ? "failed" : "success"
            }`}
          ></div>
          <p className="title">{props.title}</p>
        </div>
        <div className="more-actions">
          <img src={ICONS.moreActions} alt="more" />
        </div>
      </div>
      <div className="amount">
        <div className="symbol">
          <img src={ICONS.naira} alt="Naira" />
        </div>
        <h1 className="figure">{numberWithCommas(props.amount)}</h1>
      </div>
    </div>
  );
};

export default TransactionCard;
