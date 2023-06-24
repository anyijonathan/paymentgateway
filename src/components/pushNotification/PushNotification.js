/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

import store from "../../store";
import config from "../../config/config.json";
import { uniqueArray } from "../../utils/helperFunctions";
import { systemControllersActions } from "../../services/reducers/system.reducer";

export let stopSignalR;

const PushNotification = () => {
  const dispatch = useDispatch();
  const [connection, setConnection] = useState(null);
  const { notifications } = useSelector((state) => state.systemControllers);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(config.SERVER_URL + "/notify", {
        accessTokenFactory: () => store.getState().userAuth?.tokenResponse?.token,
      })
      .withAutomaticReconnect()
      .build();

    stopSignalR = async () => {
      try {
        await connection.stop();
      } catch (err) {}
    };

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.on("Notification", (message) => {
            toast(message?.title);
            const uniqueArr = uniqueArray([...notifications, message]);
            dispatch(systemControllersActions.setNotification(uniqueArr));
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  return null;
};

export default PushNotification;
