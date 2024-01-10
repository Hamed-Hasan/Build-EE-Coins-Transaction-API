
import CategoryForm from "./CategoryForm";
import EmployeeForm from "./EmployeeForm";

// const { default: EmployeeForm } = require("./EmployeeForm");

const UserRoleForm = ({ role }) => {

    const handleFormClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleFormClick}>
            {role === 'employee' && <EmployeeForm   />}
            {role === 'admin' && <CategoryForm />} 
        </div>
    );
};

export default UserRoleForm;
