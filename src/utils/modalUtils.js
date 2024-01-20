import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export const createModalContent = (
  buttonType,
  handleModalOpen,
  handleChange
) => {
  switch (buttonType) {
    case "Submit":
      return handleModalOpen(
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="file"
            label="Upload File"
            type="file"
            fullWidth
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>,
        "Submit Task"
      );

    case "Object":
      return handleModalOpen(
        <TextField
          autoFocus
          margin="dense"
          id="object"
          label="Object Reason"
          type="text"
          fullWidth
        />,
        "Object Task"
      );

    case "Reject":
      return handleModalOpen(
        <TextField
          autoFocus
          margin="dense"
          id="reject"
          label="Reject Reason"
          type="text"
          fullWidth
        />,
        "Reject Task"
      );

    case "Update Task Coins":
      return handleModalOpen(
        <TextField
          autoFocus
          margin="dense"
          id="number"
          label="Update Task Coins"
          type="number"
          fullWidth
        />,
        "Update Task Coins"
      );
    case "Reject":
      const RejectModalContent = () => {
        const [action, setAction] = useState("");
        const [showTextArea, setShowTextArea] = useState(false);

        const handleSelectChange = (event) => {
          const selectedAction = event.target.value;
          setAction(selectedAction);
          setShowTextArea(selectedAction === "Terminate");
        };

        return (
          <div>
            <FormControl fullWidth margin="normal">
              <InputLabel id="reject-action-label">Action</InputLabel>
              <Select
                labelId="reject-action-label"
                id="reject-action"
                value={action}
                label="Action"
                onChange={handleSelectChange}
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
              />
            )}
          </div>
        );
      };

      return handleModalOpen(<RejectModalContent />, "Reject Task");

    default:
      return null;
  }
};
