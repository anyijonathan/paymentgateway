import "./index.css";
import { Box } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

const ProfilePicture = (props) => {
  return (
    <Box
      className="profile-picture"
      sx={{ backgroundImage: `url(${props.image})` }}
    >
      {!props.image && <h1 className="text-black">CA</h1>}
      <div className="hover-click">
        <PhotoCameraOutlinedIcon color="primary" />
        <p className="text-black-10">change</p>
      </div>
      <input type="file" onChange={props.onChange} />
    </Box>
  );
};

export default ProfilePicture;
