import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Divider, Menu, Stack, Tooltip } from "@mui/material";

import { systemControllersActions } from "../../../services/reducers/system.reducer";
import { getNotifications } from "../../../services/actions/notifications.actions";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { formatDate, shortenText } from "../../../utils/helperFunctions";

const Notifications = (props) => {
  const { notifications } = useSelector((state) => state.systemControllers);
  const dispatch = useDispatch();
  const open = Boolean(props.anchorEl);

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  const sx = {
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
    mt: 2.2,
    right: 0,
    left: "unset !important",
    mr: 5,
    p: 2,
    pb: 0,
    width: "500px",
    minHeight: "300px",
  };

  const fetchNotifications = async () => {
    dispatch(systemControllersActions.startLoading());

    try {
      const response = await getNotifications(true);
      if (response) {
        dispatch(systemControllersActions.endLoading());
        dispatch(
          systemControllersActions.setNotification(response)
        );
      }
    } catch (error) {
      dispatch(systemControllersActions.endLoading());
    }
  };

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Menu
      anchorEl={props.anchorEl}
      id="notification-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: sx,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box>
        <p className="text-base font-medium text-black-10 mb-4 ">Notifications</p>
      </Box>
      <Divider />
      {notifications?.length > 0 ? (
        notifications?.map((row, i) => (
          <Box key={i}>
            <Box
              className="item-container pt-4 pb-4"
              sx={{
                cursor: "pointer",
                pr: "10px",
                pl: "10px",
                "&:hover": {
                  background:
                    "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #5C068C;",
                },
              }}
            >
              <Tooltip title={<span className="capitalize text-xs">{row?.text}</span>}>
                <Stack
                  className="item-container"
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Stack alignItems="center" direction="row" gap="10px">
                    {row?.actor?.name?.length > 0 && (
                      <Avatar {...stringAvatar(row?.actor?.name?.toUpperCase())}>
                        {row?.actor?.name?.slice(0, 1)}
                      </Avatar>
                    )}
                    <p className="text-sm">
                      {shortenText(row?.text, row?.actor?.name?.length > 0 ? 40 : 45)}
                    </p>
                  </Stack>
                  <p className="text-xs text-grey">{formatDate(row?.dateCreated)}</p>
                </Stack>
              </Tooltip>
            </Box>
            <Divider />
          </Box>
        ))
      ) : (
        <Stack
          gap="10px"
          sx={{ height: "200px" }}
          className="flex flex-col justify-center items-center"
        >
          <NotificationsActiveIcon color="primary" sx={{ width: "50px", height: "50px" }} />
          <p className="text-black">No unread notifications</p>
        </Stack>
      )}
    </Menu>
  );
};

export default Notifications;

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30,
      height: 30,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
