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

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
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

export const errorStatus = (code: any) => {
  const error: { [key: string]: string } = {
    OPENAPI00001: "서버 오류입니다.",
    OPENAPI00002: "권한이 없습니다.",
    OPENAPI00003: "유효하지 않는 식별자입니다.",
    OPENAPI00004: "등록되지 않은 사용자입니다.",
    OPENAPI00005: "API키가 유효하지 않습니다.",
    OPENAPI00007: "API 호출량 초과입니다.",
    OPENAPI00009: "데이터 준비중입니다.",
    OPENAPI000010: "게임 점검중입니다.",
    OPENAPI000011: "API 점검중입니다.",
  };

  return error[code];
};
