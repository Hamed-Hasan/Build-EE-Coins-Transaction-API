import dollar from "@/assets/dollar.png";
import CoinsMenu from "@/components/CoinsMenu/CoinsMenu";
import Image from "next/image";
import { useState } from "react";

const CoinsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        textAlign: "right",
      }}
    >
      <div
        className="spin-container-3d"
        onClick={() => setIsOpen((prev) => !prev)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        style={{
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Image className="spin-image " src={dollar} alt="" />
        <CoinsMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default CoinsButton;
