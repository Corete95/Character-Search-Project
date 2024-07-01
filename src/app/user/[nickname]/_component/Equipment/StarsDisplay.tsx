import { starforceStandard } from "../../_constants/equipmentItem";

interface Props {
  starforce: number;
  level: number;
  flag: boolean;
}

const StarsDisplay = ({ starforce, level, flag }: Props) => {
  const keys = Object.keys(starforceStandard)
    .map(Number)
    .sort((a, b) => b - a);

  const relevantKey = keys.find((key) => key <= level);
  const totalStars =
    starforceStandard[relevantKey] !== undefined
      ? starforceStandard[relevantKey]
      : starforce;

  const maxStars = flag ? 15 : Math.min(25, totalStars);
  const starColor = flag ? "#0ddaf9" : "#e4ce00";

  const stars = Array.from({ length: maxStars }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill={index < starforce ? starColor : "#9e9e9e"}
      viewBox="0 0 24 24"
      style={{
        marginRight: (index + 1) % 5 === 0 ? "7px" : "0",
      }}
    >
      <path d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z" />
    </svg>
  ));

  return (
    <div className="flex flex-wrap place-content-center gap-1 pb-1">
      <div className="flex">{stars.slice(0, 15)}</div>
      {maxStars > 15 && <div className="flex">{stars.slice(15, 25)}</div>}
    </div>
  );
};

export default StarsDisplay;
