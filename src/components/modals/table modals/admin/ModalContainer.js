import { Box, Modal } from "@mui/material";

const ModalContainer = ({ open, handleClose, children }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-content">{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;
