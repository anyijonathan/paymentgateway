import React from "react";
import "./index.css";
import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";

const NotificationGroup = (props) => {
  return (
    <div className="notification-group">
      <Stack gap="5px">
        <h1 className="title">{props?.title}</h1>
        <p className="sub">{props?.subtitle}</p>
      </Stack>
      <FormGroup className="toggles">
        <FormControlLabel
          className="toggle-control"
          control={
            <Switch
              checked={props?.state?.push}
              onChange={props?.onChange}
              name="push"
            />
          }
          label="Push"
        />
        {!props.hideSMS && (
          <FormControlLabel
            className="toggle-control"
            control={
              <Switch
                checked={props?.state?.sms}
                onChange={props?.onChange}
                name="sms"
              />
            }
            label="SMS"
          />
        )}
        <FormControlLabel
          className="toggle-control"
          control={
            <Switch
              checked={props?.state?.email}
              onChange={props?.onChange}
              name="email"
            />
          }
          label="Email"
        />
      </FormGroup>
    </div>
  );
};

export default NotificationGroup;
