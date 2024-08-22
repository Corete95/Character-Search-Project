import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  label: string;
  placeholder: string;
  items: {
    id: string;
    name: string;
    url: string;
  }[];
  selectedKey: string | null;
  styles?: string;
  transparent?: boolean;
  onChange: (value: string) => void;
}

const WorldCommonSelect = ({
  label,
  placeholder,
  items,
  selectedKey,
  styles,
  transparent,
  onChange,
}: Props) => {
  return (
    <Select
      items={items}
      label={label}
      placeholder={placeholder}
      labelPlacement="inside"
      className={`h-12 max-w-48 ${styles}`}
      classNames={
        transparent && {
          label: "!text-black dark:!text-black",
          selectorIcon: "dark:!text-black",
          trigger: "h-full bg-transparent data-[hover=true]:bg-transparent ",
          value: "text-gray-500 dark:!text-black",
          listbox:
            "bg-white dark:bg-[#272727] text-gray-700 dark:text-gray-300",
          base: "data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-[#3a3a3a] ",
        }
      }
      selectedKeys={selectedKey ? [selectedKey] : []}
      onChange={(e) => onChange(e.target.value)}
      renderValue={(select) => {
        return select.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Image
              alt={item.data.name}
              className="flex-shrink-0"
              src={item.data.url}
              width={16}
              height={16}
              priority
              unoptimized
            />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">{item.data.name}</span>
            </div>
          </div>
        ));
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex items-center gap-2">
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
  );
};

export default WorldCommonSelect;
