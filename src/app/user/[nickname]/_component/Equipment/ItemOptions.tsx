import Image from "next/image";
import { textColors } from "../../_constants/equipmentItem";

interface Props {
  options: string[];
  title: string;
  iconSrc: string;
  potential: string;
}

const ItemOptions = ({ options, title, iconSrc, potential }: Props) => {
  const allNull = options.every((element) => element === null);
  return (
    <>
      <hr className="my-1 border-dashed border-[#ffffff1f]" />
      <div className="px-3 py-1 text-xs">
        <p className={`mb-0.5 flex ${textColors[potential]}`}>
          <Image
            src={`/images/item/${iconSrc}`}
            alt={title}
            width={13}
            height={13}
            className="mr-1 object-contain"
          />
          {title}
        </p>
        {allNull ? (
          <div>
            <p> 잠재능력이 봉인 되어 있습니다.</p>
            <p>(아이템 창의 돋보기 버튼을 클릭하여 확인할 수 있습니다.)</p>
          </div>
        ) : (
          options.map((option, index) => <p key={index}>{option}</p>)
        )}
      </div>
    </>
  );
};

export default ItemOptions;
