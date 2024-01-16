
import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";
import EmployeeCoinsPage from "./user/employeecoins";

const HomePage = () => {
  return (
    <div>
      <CoinsButton />
      <ReusableModal/>
      <EmployeeCoinsPage/>
    </div>
  );
};

export default HomePage;
