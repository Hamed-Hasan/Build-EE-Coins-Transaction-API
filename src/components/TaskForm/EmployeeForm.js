import { FormProvider, useForm } from "react-hook-form";
import FormInputText from "./FormInputText"; // import your reusable field component

const EmployeeForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle submission for employee tasks
  };

  return (
    <FormProvider {...methods}>
      <h2>For employee</h2>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInputText name="title" label="Title " />
        <FormInputText name="description" label="Description" />

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default EmployeeForm;
