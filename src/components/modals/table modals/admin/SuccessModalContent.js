import { Button } from "@mui/material";

import { ICONS } from "../../../../assets";

const SuccessModalContent = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={ICONS.checkIcon}
        alt="check icon"
        className="w-[64px] h-[64px]"
      />
      <h3 className="font-medium text-lg mt-5">{props.header}</h3>
      {props.subHeader && (
        <p className="text-[#928798] text-sm ">{props.subHeader}</p>
      )}
      <Button
        variant="contained"
        disableElevation
        sx={{
          height: "56px",
          fontSize: "16px",
          width: "404px",
          marginTop: "3rem",
        }}
        onClick={props.closeModal}
      >
        {props.actionText}
      </Button>
    </div>
  );
};

export default SuccessModalContent;
