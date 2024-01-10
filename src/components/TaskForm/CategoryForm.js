import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';

const CategoryForm = ({ defaultValues,onFormFocus  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      name: '',
      coins: 0,
    }
  });

  const onSubmit = data => {
    // Log the form data to the console
    console.log('Form Data:', data);

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("name", { required: true })}
            label="Name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("coins", { required: true })}
            label="Coins"
            variant="outlined"
            fullWidth
            type="number"
            error={!!errors.coins}
            helperText={errors.coins ? "Coins are required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
