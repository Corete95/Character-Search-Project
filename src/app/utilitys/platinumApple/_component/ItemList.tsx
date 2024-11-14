import { PlatinumAppleItem } from "@/types/platinum.type";
import Image from "next/image";

interface ItemListProps {
  items: PlatinumAppleItem[];
}
const ItemList = ({ items }: ItemListProps) => (
  <div className="userContainer h-full w-full rounded-lg mobile:mb-2 desktop:w-[30%]">
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <div className="bg-orange-400 p-4 text-white">
        <h2 className="text-2xl font-bold">아이템 확률 정보</h2>
      </div>
      <div className="max-h-[calc(100vh-0px)] overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="flex items-center px-4 py-1">
            <div className="mr-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-zinc-200">
              <Image
                src={`/images/platinumApple/${encodeURIComponent(item.name)}.png`}
                alt={item.name}
                style={{ objectFit: "cover" }}
                width={32}
                height={32}
                priority
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-zinc-500 dark:text-orange-400">
                확률: {item.probability}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ItemList;
