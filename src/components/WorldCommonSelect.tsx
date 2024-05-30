import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

interface CommonSelectProps {
  label: string;
  placeholder: string;
  items: any[];
  selectedKey: any;
  onChange: (value: string) => void;
}

const WorldCommonSelect: React.FC<CommonSelectProps> = ({
  label,
  placeholder,
  items,
  selectedKey,
  onChange,
}) => {
  console.log("items", items);
  return (
    <Select
      items={items}
      label={label}
      placeholder={placeholder}
      labelPlacement="inside"
      classNames={{
        base: "max-w-48",
        trigger: "h-12",
      }}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onChange={(e) => onChange(e.target.value)}
      renderValue={(select) => {
        return select.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Image
              alt={item?.data.name}
              className="flex-shrink-0"
              src={item.data.url}
              width={20}
              height={20}
            />
            <div className="flex flex-col">
              <span>{item.data.name}</span>
            </div>
          </div>
        ));
      }}
    >
      {(user): any => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Image
              alt={user.name}
              className="flex-shrink-0"
              src={user.url}
              width={20}
              height={20}
            />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
    // <Select
    //   label={label}
    //   placeholder={placeholder}
    //   items={items}
    //   selectedKeys={selectedKey ? [selectedKey] : []}
    //   onChange={(e) => onChange(e.target.value)}
    //   className="max-w-48"
    // >
    //   {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    // </Select>
  );
};

export default WorldCommonSelect;
