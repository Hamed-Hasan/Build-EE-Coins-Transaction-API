import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

export default function RejectTaskModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [action, setAction] = useState("Revise");
  const [showTextArea, setShowTextArea] = useState(false);

  const handleSelectChange = (e) => {
    const selectedAction = e.target.value;
    setAction(selectedAction);
    setRejectStatus(selectedAction);
    setShowTextArea(selectedAction === "Terminate");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Reject</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="reject-action-label">Action</InputLabel>
              <Select
                labelId="reject-action-label"
                id="reject-action"
                value={action}
                label="Action"
                onChange={(e) => handleSelectChange(e)}
              >
                <MenuItem value="Revise">Revise</MenuItem>
                <MenuItem value="Terminate">Terminate</MenuItem>
              </Select>
            </FormControl>
            {showTextArea && (
              <TextField
                autoFocus
                margin="dense"
                id="terminateReason"
                label="Termination Reason"
                placeholder="Please Write Your Reason!"
                type="text"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => setTerminateReason(e.target.value)}
              />
            )}
          </div>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
