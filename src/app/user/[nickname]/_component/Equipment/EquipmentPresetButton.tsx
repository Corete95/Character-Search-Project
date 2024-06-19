import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";

interface Props {
  data: number[];
  selected: number;
  style: string;
  onClick: (number: number) => void;
}

const EquipmentPresetButton = ({ data, selected, style, onClick }: Props) => {
  return (
    <ButtonGroup>
      {data.map((number) => (
        <Button
          key={number}
          className={`${
            selected === number ? "text-black bg-[#bdbbbc]" : "hover:font-bold"
          } ${style}`}
          onClick={() => onClick(number)}
        >
          프리셋 {number}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default EquipmentPresetButton;
