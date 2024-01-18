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

export default function UpdateTaskCoinsModal({ task }) {
  const [beforeCoins, setBeforeCoins] = React.useState();
  const [afterCoins, setAfterCoins] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (task) {
      setBeforeCoins(task?.totalCoins);
    }
  }, []);

  React.useEffect(() => {
    setAfterCoins(Number(beforeCoins) + Number(amount));
  }, [amount]);
  console.log("beforeCoins", beforeCoins);
  console.log("amount", amount);
  console.log("afterCoins", afterCoins);
  return (
    <div>
      <Button onClick={handleOpen}>+</Button>
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
              id="beforeCoins"
              type="text"
              label="Before Coins"
              placeholder="Please type object Reason"
              value={beforeCoins}
            />
            <TextField
              required
              fullWidth
              id="amount"
              type="number"
              label="Amount"
              placeholder="Please type object Reason"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              required
              fullWidth
              id="amount"
              type="text"
              label="Amount"
              placeholder="Please type object Reason"
              value={afterCoins}
            />
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
