import AdminForm from "./AdminForm";

const { default: EmployeeForm } = require("./EmployeeForm");

const UserRoleForm = ({ role }) => {
    const handleFormClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleFormClick}>
            {role === 'employee' && <EmployeeForm />}
            {role === 'admin' && <AdminForm />} 
        </div>
    );
};

export default UserRoleForm;
