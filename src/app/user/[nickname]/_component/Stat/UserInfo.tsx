import React, { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "../common/Badge";
import { InfoType } from "@/types/apis/stat";
import { mapType, statColor } from "@/app/user/[nickname]/_constants/statItem";
import { FaGear } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
interface Props {
  info: InfoType;
}

const UserInfo = ({ info }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );
  const [modalSelect, setModalSelect] = useState("");

  useEffect(() => {
    const storedBackground = localStorage.getItem("backgroundImage");
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      setModalSelect(storedBackground);
    }
  }, []);

  const handleConfirm = () => {
    if (modalSelect) {
      localStorage.setItem("backgroundImage", modalSelect);
      setSelectedBackground(modalSelect);
    }
    onClose();
  };

  return (
    <div
      className={`relative flex w-full flex-wrap rounded-lg ${statColor[selectedBackground] || "bg-white"}`}
    >
      <div className="absolute right-3 top-2 cursor-pointer">
        <FaGear onClick={onOpen} />
      </div>
      <div className="flex w-1/3 flex-col justify-between p-4">
        <div className="badge dark:bg-badge_1">{info?.character_class}</div>
        <div className="flex flex-col gap-1">
          <Badge label="유니온" value={info.union_level} />
          <Badge label="무릉도장" value={`${info.dojang_best_floor} 층`} />
          <Badge label="인기도" value={info.popularity} />
        </div>
      </div>
      <div className="w-1/3 px-3 text-center">
        <div className="mb-4 leading-none">
          <div className="badge w-auto rounded-md rounded-t-none px-4 dark:bg-badge_1">
            Lv. {info.character_level}
          </div>
        </div>
        <Image
          src={info?.character_image}
          alt="캐릭터 사진"
          width={96}
          height={96}
          priority
          unoptimized
        />
        <div className="badge my-4 px-3 dark:bg-main_gray">
          {info.character_name}
        </div>
      </div>
      <div className="flex w-1/3 flex-col justify-end gap-1 p-4">
        <Badge label="월드" value={info.world_name} />
        <Badge label="길드" value={info.character_guild_name} />
      </div>
      <div className="mb-2 w-full px-4">
        <div className="relative h-4 rounded-full bg-white_gray_100 dark:bg-[#414240]">
          <div
            className="h-4 rounded-full bg-[#AFCD00]"
            style={{ width: `${info.character_exp_rate}%` }}
          ></div>
          <span className="text-gray-900 absolute inset-0 flex items-center justify-center text-[9px] font-medium">
            {info.character_exp_rate}%
          </span>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        onClose={() => setModalSelect(selectedBackground)}
      >
        <ModalContent>
          {(onClise) => (
            <div>
              <ModalHeader>배경 변경</ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap justify-around gap-2">
                  {mapType.map((item) => (
                    <div
                      key={item}
                      className={`cursor-pointer p-1 ${
                        modalSelect === item ? "bg-blue-500" : "bg-transparent"
                      }`}
                      onClick={() => setModalSelect(item)}
                    >
                      <Image
                        src={`/images/map/${item}.png`}
                        alt={item}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "150px", height: "100%" }}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClise}>
                  닫기
                </Button>
                <Button color="success" variant="flat" onClick={handleConfirm}>
                  확인
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserInfo;
