import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import * as React from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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

export default function SubmitTaskModal({ task, handleSubmitTask }) {
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Submit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={formStyle}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {file?.name && <p>{file.name}</p>}
            <div>
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSubmitTask(task?.id, task?.id, file)}
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
