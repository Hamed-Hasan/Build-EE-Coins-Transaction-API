import TextField from "@mui/material/TextField";

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

    default:
      return null;
  }
};
