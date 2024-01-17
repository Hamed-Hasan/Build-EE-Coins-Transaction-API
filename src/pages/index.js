import ReusableModal from "@/components/AlertDialogSlide/ReusableModal";
import AnimationCoinModal from "@/components/AnimationCoinModal/AnimationCoinModal";
import CoinsButton from "@/components/CoinsButton/CoinsButton";

const HomePage = () => {
  return (
    <div>
      <AnimationCoinModal/>
      <CoinsButton />
      <ReusableModal />
    </div>
  );
};

export default HomePage;
