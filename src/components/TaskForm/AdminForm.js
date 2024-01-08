import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInputText from './FormInputText'; 

const AdminForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle submission for admin category management
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInputText name="categoryName" label="Category Name" />
        <FormInputText name="categoryDescription" label="Category Description" />
        {/* Add more fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default AdminForm;
