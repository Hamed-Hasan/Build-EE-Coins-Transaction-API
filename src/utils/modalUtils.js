import React from 'react';
import TextField from '@mui/material/TextField';

export const createModalContent = (buttonType, handleModalOpen) => {
  switch (buttonType) {
    case 'Submit':
      return handleModalOpen(
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="file"
            label="Upload File"
            type="file"
            fullWidth
          />
        </div>,
        'Submit Task'
      );

    case 'Object':
      return handleModalOpen(
        <TextField
          autoFocus
          margin="dense"
          id="object"
          label="Object Reason"
          type="text"
          fullWidth
        />,
        'Object Task'
      );

    case 'Reject':
      return handleModalOpen(
        <TextField
          autoFocus
          margin="dense"
          id="reject"
          label="Reject Reason"
          type="text"
          fullWidth
        />,
        'Reject Task'
      );

    default:
      return null;
  }
};
