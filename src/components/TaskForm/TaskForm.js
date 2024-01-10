import {
  getTasksCategoryDPList,
  getUserDropdownList,
  postAddTask,
} from "@/services/businessLogic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const EmployeeForm = ({ defaultValues, onSubmitProp }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [coins, setCoins] = useState(0);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [FKUID, setFKUID] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [newErrors, setErrors] = useState("");
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      startTime: dayjs(defaultValues?.startTime) || dayjs(),
      dueTime: dayjs(defaultValues?.dueTime) || dayjs(),
      categoryName: "",
      categoryCoins: "",
      FKUID: "",
      AssigndUser: "",
      uploadFile: null,
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("uploadFile", file);
      setSelectedFileName(file.name);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    const found = categories.find((cat) => cat.name === e.target.value);
    setCoins(found.coins);
    setValue("categoryName", e.target.value);
    setValue("categoryCoins", found.coins);
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    const found = users.find((user) => user.uName === e.target.value);
    setFKUID(found.uId);
    setValue("AssigndUser", e.target.value);
    setValue("FKUID", found.uId);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value instanceof File ? value : value || "");
    }
    const res = await postAddTask(formData);
    if (res) {
      alert("Success..!");
      for (const [key, value] of Object.entries(data)) {
        setValue(key, "");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await getTasksCategoryDPList();
      const usersRes = await getUserDropdownList();
      setCategories(categoriesRes);
      setUsers(usersRes);
    };
    fetchData();
  }, []);

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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              {...register("categoryName", { required: true })}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
              error={!!errors.category}
              helperText={errors.category ? "Category is required" : ""}
            >
              {categories?.map((cat, i) => {
                return (
                  <MenuItem key={i} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
            helperText={
              errors.categoryCoins ? "Category Coins are required" : ""
            }
            disabled
            value={coins}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Assigned User</InputLabel>
            <Select
              {...register("AssigndUser", { required: true })}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="Assigned"
              onChange={handleUserChange}
            >
              {users?.map((user, i) => {
                return (
                  <MenuItem key={i} value={user.uName}>
                    {user.uName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("FKUID", { required: true })}
            label="FkUId"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.FKUID}
            helperText={errors.FKUID ? "FkUId is required" : ""}
            disabled
            value={FKUID}
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
                <Typography variant="subtitle1">{selectedFileName}</Typography>
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
