import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Grid, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CategoryIcon from '@mui/icons-material/Category';
import { postAddOrEditCategory } from '@/services/businessLogic';
import { useAlert } from '@/hooks/useAlert';

const CategoryForm = ({ defaultValues, onFormFocus }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: defaultValues || {
      name: '',
      coins: 0,
    }
  });

  const [loading, setLoading] = useState(false);
  const { alert, setSuccess, setError, clearAlert } = useAlert();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('Name', data.name);
      formData.append('Coins', data.coins);

      const response = await postAddOrEditCategory(formData);
      console.log('Server Response:', response);

      // Call setSuccess only when the request is successful.
      setSuccess('Category successfully saved!');
      reset();
    } catch (error) {
      console.error('Error submitting category:', error);

      // Call setError with the specific error message.
      setError('Failed to save category. Please try again.');
    } finally {
      // Remove the setSuccess call from here
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };


  useEffect(() => {
    if (alert.message && !loading) {
      const timer = setTimeout(() => {
        clearAlert();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, loading, clearAlert]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {!loading && alert.message && (
        <Grid item xs={12}>
          <Alert severity={alert.severity} style={{ marginBottom: '20px' }}>
            {alert.message}
          </Alert>
        </Grid>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[a-zA-Z0-9\s_-]*$/,
                message: "Name can only include letters, digits, spaces, hyphens, slashes, and underscores"
              }
            })}
            label="Name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />


        </Grid>
        <Grid item xs={12}>
        <TextField
        {...register("coins", {
          required: "Coins are required",
          valueAsNumber: true,
          validate: value => {
            // This regex allows only positive integers without leading zeros and disallows '0'
            const isValid = /^[1-9]\d*$/.test(value);
            return isValid || "Coins should be a positive integer without leading zeros";
          }
        })}
        label="Coins"
        variant="outlined"
        fullWidth
        type="number"
        error={!!errors.coins}
        helperText={errors.coins ? errors.coins.message : ""}
      />


        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<CategoryIcon />}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Category
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
