import { Box, Stack } from "@mui/material";
import { ICONS } from "../../assets";

const NoTableData = (props) => {
  return (
    <Box className="grid h-full w-full justify-center items-center absolute">
      <Stack direction="column" alignItems="center">
        <div className="w-max">
          <img src={ICONS.noData} alt="No Records" />
        </div>
        <p>
          Record does not exist <span>{props.text}</span>{" "}
          <span
            className="text-purple font-medium cursor-pointer"
            onClick={props.onClick}
          >
            {props.link}
          </span>
          .
        </p>
      </Stack>
    </Box>
  );
};

export default NoTableData;
