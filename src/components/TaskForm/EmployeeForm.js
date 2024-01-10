import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs from 'dayjs';

const EmployeeForm = ({ defaultValues, onSubmitProp }) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      title: '',
      description: '',
      startTime: dayjs(defaultValues?.startTime) || dayjs(),
      dueTime: dayjs(defaultValues?.dueTime) || dayjs(),
      categoryName: '',
      categoryCoins: 0,
      fkUId: 0,
      assignedUser: '',
      uploadFile: null,
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("uploadFile", file);
      setSelectedFileName(file.name);
    }
  };

  const onSubmit = (data) => {

    // Construct formData to include the file
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value instanceof File ? value : value || '');
    }

    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("title", { required: true })}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? "Title is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("description", { required: true })}
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Start Time"
                  {...field}
                  value={field.value || null}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.startTime}
                      helperText={errors.startTime && "Start Time is required"}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="dueTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Due Time"
                  {...field}
                  value={field.value || null}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.dueTime}
                      helperText={errors.dueTime && "Due Time is required"}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("categoryName", { required: true })}
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.categoryName}
            helperText={errors.categoryName ? "Category Name is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("categoryCoins", { required: true })}
            label="Category Coins"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.categoryCoins}
            helperText={errors.categoryCoins ? "Category Coins are required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("fkUId", { required: true })}
            label="FkUId"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.fkUId}
            helperText={errors.fkUId ? "FkUId is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("assignedUser", { required: true })}
            label="Assigned User"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.assignedUser}
            helperText={errors.assignedUser ? "Assigned User is required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                // accept="image/*"
                type="file"
                hidden // Hide the actual input element
                {...register("uploadFile")}
                onChange={handleFileChange} // Set the onChange handler
              />
            </Button>
            <Box marginLeft={2}>
              {selectedFileName && (
                <Typography variant="subtitle1">
                  {selectedFileName}
                </Typography>
              )}
            </Box>
          </Box>
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

export default EmployeeForm;
