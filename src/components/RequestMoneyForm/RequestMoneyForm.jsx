import React from 'react';
import { Button, TextField, Typography } from "@mui/material";

const RequestMoneyForm = ({ coinsId }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
    console.log("Submitting Request Money form for Coins ID:", coinsId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Request Money</Typography>
      <TextField
        label="Coins ID"
        variant="outlined"
        value={coinsId || ''}
        disabled
        fullWidth
        margin="normal"
      />
      {/* Add more form fields as needed */}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
        Submit
      </Button>
    </form>
  );
};

export default RequestMoneyForm;
