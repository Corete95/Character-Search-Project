import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Progress } from "@nextui-org/react";
import { SymbolType } from "@/types/apis/item.type";
import { calculateStats } from "../../_constants/equipmentItem";
import Image from "next/image";

interface Props {
  symbols: SymbolType[];
}

const SymbolDisplay = ({ symbols }: Props) => {
  const [selectedType, setSelectedType] = useState("아케인");
  const [stats, setStats] = useState({
    forceSum: 0,
    statsSum: 0,
    statLabels: "",
  });

  const [filteredSymbols, setFilteredSymbols] = useState<SymbolType[]>([]);
  console.log(symbols);
  useEffect(() => {
    updateFilteredSymbols();
  }, [symbols, selectedType]);

  const updateFilteredSymbols = () => {
    const currentFilteredSymbols = symbols.filter((symbol) =>
      symbol.symbol_name.includes(selectedType)
    );
    setFilteredSymbols(currentFilteredSymbols);
    const updatedStats = calculateStats(currentFilteredSymbols);
    setStats(updatedStats);
  };

  const getSymbolTypeLabel = () => (selectedType === "아케인" ? "ARC" : "AUT");

  return (
    <div className="mt-3 py-3 px-6 bg-white dark:bg-[#15181D]">
      <ButtonGroup className="w-full">
        {["아케인", "어센틱"].map((type) => (
          <Button
            key={type}
            className={`w-full rounded-none text-xs ${
              selectedType === type
                ? "text-black bg-[#bdbbbc]"
                : "hover:font-bold"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
      <div className="mt-3 text-xs text-center">
        <p>
          {getSymbolTypeLabel()}: {stats.forceSum}
        </p>
        <p>
          {stats.statLabels}: {stats.statsSum}
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredSymbols.map((symbol, index) => (
          <SymbolDetails
            key={index}
            symbol={symbol}
            selectedType={selectedType}
          />
        ))}
      </div>
    </div>
  );
};

const SymbolDetails = ({
  symbol,
  selectedType,
}: {
  symbol: SymbolType;
  selectedType: string;
}) => {
  const typeValue: { [key: string]: number } = {
    아케인: 20,
    어센틱: 11,
  };
  return (
    <div className="mt-2 w-[30%] min-h-88px flex flex-col items-center bg-[#2b2f31e8] ml-1 text-xs py-2 px-3">
      <Image
        src={symbol.symbol_icon}
        alt="Symbol Image"
        width={38}
        height={38}
      />
      <div>Lv.{symbol.symbol_level}</div>
      {symbol.symbol_level === typeValue[selectedType] ? (
        <div>MAX</div>
      ) : (
        <div className="w-full mt-1 ">
          <Progress
            color="default"
            aria-label=""
            className="h-7px"
            value={
              (symbol.symbol_growth_count /
                symbol.symbol_require_growth_count) *
              100
            }
          />
          <p className="text-9px text-center mt-1">
            (
            {`${symbol.symbol_growth_count} / ${symbol.symbol_require_growth_count}`}
            )
          </p>
        </div>
      )}
    </div>
  );
};

export default SymbolDisplay;
