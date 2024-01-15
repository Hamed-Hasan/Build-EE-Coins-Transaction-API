import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

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

const SimpleModal = ({ open, setOpen, type }) => {
  const [file, setFile] = useState({});
  switch (type) {
    case "SUBMIT_MODAL":
      return (
        <div className="simple-modal">
          <div>
            <span
              onClick={() => {
                console.log(true);
                setOpen(false);
              }}
            >
              <CloseIcon />
            </span>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {file.name && file.name}
            <Button variant="contained">Send</Button>
          </div>
        </div>
      );
    case "OBJECT_MODAL":
      return;
    case "REJECT_MODAL":
      return;
  }
  return;
};

export default SimpleModal;
