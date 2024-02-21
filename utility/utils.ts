export const geKoreanNumber = (number: number) => {
  const koreanUnits = ["조", "억", "만", ""];
  const unit = 10000;
  let answer = "";

  while (number > 0) {
    const mod = number % unit;
    number = Math.floor(number / unit);
    answer = `${mod}${koreanUnits.pop()}${answer}`;
  }
  return answer;
};

export const abilityColor = (ability: string) => {
  const color: { [key: string]: string } = {
    레전드리: "bg-legendary",
    유니크: "bg-unique",
    에픽: "bg-epic",
    레어: "bg-rare",
  };

  return color[ability];
};
