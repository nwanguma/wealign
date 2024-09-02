import React from "react";
import Image from "next/image";

interface SideColumnProps {
  imageSrc: string;
  altText: string;
}

const SideColumn: React.FC<SideColumnProps> = ({ imageSrc, altText }) => {
  return (
    <div className="bg-purple-600">
      <Image src={imageSrc} alt={altText} width={400} height={400} />
    </div>
  );
};

export default SideColumn;
