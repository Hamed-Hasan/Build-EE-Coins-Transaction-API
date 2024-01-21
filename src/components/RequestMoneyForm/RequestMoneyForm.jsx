import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { getLocationsDropdown, getProjectsDropdown, postRequestMoneyByCoins } from '@/services/businessLogic';

const RequestMoneyForm = ({ coinsId }) => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [locations, setLocations] = useState([]);
    const [projects, setProjects] = useState([]);
    //   console.log("🚀 ~ RequestMoneyForm ~ projects:", projects)
    //   console.log("🚀 ~ RequestMoneyForm ~ locations:", locations)

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const locationsData = await getLocationsDropdown();
                setLocations(locationsData);
                const projectsData = await getProjectsDropdown();
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('CoinsId', coinsId);
            formData.append('TotalConvertedCoins', data.TotalConvertedCoins);
            formData.append('ReqReason', data.ReqReason);
            formData.append('ProjectName', data.ProjectName);
            formData.append('LocationName', data.LocationName);

            const response = await postRequestMoneyByCoins(formData);
            console.log(response);
            reset(); // Reset form after submission
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        reset({
            TotalConvertedCoins: '',
            ReqReason: '',
            ProjectName: '',
            LocationName: ''
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Total Converted Coins"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('TotalConvertedCoins', { required: true })}
                error={!!errors.TotalConvertedCoins}
                helperText={errors.TotalConvertedCoins ? 'Total Converted Coins is required' : ''}
            />
            <TextField
                label="Request Reason"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('ReqReason', { required: true })}
                error={!!errors.ReqReason}
                helperText={errors.ReqReason ? 'Request Reason is required' : ''}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Project Name</InputLabel>
                <Controller
                    name="ProjectName"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select {...field} label="Project Name" error={!!errors.ProjectName}>
                            {projects.map(project => (
                                <MenuItem key={project.id} value={project.projName}>
                                    {project.projName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Location Name</InputLabel>
                <Controller
                    name="LocationName"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select {...field} label="Location Name" error={!!errors.LocationName}>
                            {locations.map(location => (
                                <MenuItem key={location.locationId} value={location.locName}>
                                    {location.locName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Submit
            </Button>
        </form>
    );
};

export default RequestMoneyForm;
