import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid } from '@mui/material';
import { postAddOrEditCategory } from '@/services/businessLogic';

const CategoryForm = ({ defaultValues, onFormFocus }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      name: '',
      coins: 0,
    }
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('Name', data.name);
      formData.append('Coins', data.coins);
      // Include the 'Id' field if editing an existing category
      // formData.append('Id', data.id);

      const response = await postAddOrEditCategory(formData);
      console.log('Server Response:', response);

      // Additional logic after successful submission
      // For example, you might want to clear the form or display a success message
    } catch (error) {
      console.error('Error submitting category:', error);
      // Handle errors, e.g., display an error message
    }
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
