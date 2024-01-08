import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FormInputText = ({ name, label, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default FormInputText;