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
