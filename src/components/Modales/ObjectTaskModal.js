import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default function ObjectTaskModal({ task, handleObjectTask }) {
  const [objectReason, setObjectReason] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Object</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={formStyle}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              id="objectReason"
              type="text"
              label="Object Reason"
              placeholder="Please type object Reason"
              value={objectReason}
              onChange={(e) => {
                setObjectReason(e.target.value);
              }}
            />
            <div>
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleObjectTask(task?.id, objectReason)}
              >
                Send
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
