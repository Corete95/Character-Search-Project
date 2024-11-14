export interface PlatinumAppleItem {
  name: string;
  probability: number;
}

export interface CalculationResult {
  name: string;
  expectedProbability: string;
  actualProbability: string;
  message?: string;
}

export interface InputFormProps {
    totalUsed: string;
    itemCounts: string[];
    onTotalUsedChange: (value: string) => void;
    onItemCountChange: (index: number, value: string) => void;
    onCalculate: () => void;
    items: { name: string; probability: number }[];
  }