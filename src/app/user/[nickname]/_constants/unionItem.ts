import { UnionArtifactCrystal } from "@/types/apis/union.type";

const nameToArtifact: { [key: string]: string } = {
  "크리스탈 : 주황버섯": "artifact01",
  "크리스탈 : 슬라임": "artifact02",
  "크리스탈 : 뿔버섯": "artifact03",
  "크리스탈 : 스텀프": "artifact04",
  "크리스탈 : 스톤골렘": "artifact05",
  "크리스탈 : 발록": "artifact06",
  "크리스탈 : 자쿰": "artifact07",
  "크리스탈 : 핑크빈": "artifact08",
  "크리스탈 : 파풀라투스": "artifact09",
};

export const crystalOptionsShortNames: { [key: string]: string } = {
  "몬스터 방어율 무시 증가": "방무",
  "크리티컬 확률 증가": "크확",
  "추가 경험치 획득 증가": "추경",
  "올스탯 증가": "올스텟",
  "데미지 증가": "데미지",
  "아이템 드롭률 증가": "아획",
  "메소 획득량 증가": "메획",
  "보스 몬스터 공격 시 데미지 증가": "보공",
  "크리티컬 데미지 증가": "크뎀",
  "공격력/마력 증가": "공/마",
  "버프 지속시간 증가": "벞지",
  "재사용 대기시간 미적용 확률 증가": "재사용",
  "파이널 어택류 스킬 데미지 증가": "파택",
  "최대 MP/MP 증가": "HP/MP",
  "상태이상 내성 증가": "상태이상",
  "소환수 지속시간 증가": "소환수",
};

export const getArtifactCombine = (item: UnionArtifactCrystal) => {
  const artifact = nameToArtifact[item.name];
  const color = item.level === 5 ? "purple" : "blue";
  return `/images/artifact/${artifact}-${color}.png`;
};
