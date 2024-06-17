import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  label: string;
  placeholder: string;
  items: { key: string; label: string }[];
  selectedKey: string | null;
  onChange: (value: string) => void;
}

const CommonSelect = ({
  label,
  placeholder,
  items,
  selectedKey,
  onChange,
}: Props) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      items={items}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onChange={(e) => onChange(e.target.value)}
      className={`max-w-48 mobile:w-[122px]`}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
};

export default CommonSelect;
