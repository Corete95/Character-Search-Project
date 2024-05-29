import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface CommonSelectProps {
  label: string;
  placeholder: string;
  items: { key: string; label: string }[];
  selectedKey: string | null;
  onChange: (value: string) => void;
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  label,
  placeholder,
  items,
  selectedKey,
  onChange,
}) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      items={items}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-48"
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
};

export default CommonSelect;
