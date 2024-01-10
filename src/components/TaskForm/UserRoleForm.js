import AdminForm from "./AdminForm";
import EmployeeForm from "./EmployeeForm";

// const { default: EmployeeForm } = require("./EmployeeForm");

const UserRoleForm = ({ role }) => {

    // const handleFormSubmit = (formData) => {
    //     console.log('Form Data:', formData);
    //     // Here you would typically send the form data to the backend via an API call
    //   };

    const handleFormClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleFormClick}>
            {role === 'employee' && <EmployeeForm   />}
            {role === 'admin' && <AdminForm />} 
        </div>
    );
};

export default UserRoleForm;
