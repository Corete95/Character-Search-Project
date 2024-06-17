interface Props {
  stat: { key: string; value: string };
  value: number;
  base: number;
  additional: number;
  etc: number;
  starforce: number;
}

const StatDisplay = ({
  stat,
  value,
  base,
  additional,
  etc,
  starforce,
}: Props) => {
  const shouldShowPercent = [
    "boss_damage",
    "ignore_monster_armor",
    "all_stat",
    "damage",
  ].includes(stat.value);
  const displayValue = `${value}${shouldShowPercent ? "%" : ""}`;
  const displayBase = `${base || 0}${shouldShowPercent ? "%" : ""}`;

  return (
    value > 0 && (
      <p>
        <span
          className={`${value !== base ? "text-[#65ffff]" : "text-[#FFFFFF]"}`}
        >
          {stat.key} : {value !== base ? `+${displayValue}` : displayValue}{" "}
        </span>
        {value !== base && (
          <>
            ( {displayBase}
            {additional > 0 && (
              <span className="text-[#ccff02]">
                {" "}
                +{additional}
                {shouldShowPercent ? "%" : ""}
              </span>
            )}
            {etc > 0 && (
              <span className="text-[#AAAAFF]">
                {" "}
                +{etc}
                {shouldShowPercent ? "%" : ""}
              </span>
            )}
            {starforce > 0 && (
              <span className="text-[#FFCC00]">
                {" "}
                +{starforce}
                {shouldShowPercent ? "%" : ""}
              </span>
            )}
            )
          </>
        )}
      </p>
    )
  );
};

export default StatDisplay;
