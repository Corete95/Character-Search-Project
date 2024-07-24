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
  const [filteredSymbols, setFilteredSymbols] = useState<SymbolType[]>([]);
  const [stats, setStats] = useState({
    forceSum: 0,
    statsSum: 0,
    statLabels: "",
  });

  useEffect(() => {
    updateFilteredSymbols();
  }, [symbols, selectedType]);

  const updateFilteredSymbols = () => {
    const currentFilteredSymbols = symbols.filter((symbol) =>
      symbol.symbol_name.includes(selectedType),
    );
    setFilteredSymbols(currentFilteredSymbols);
    const updatedStats = calculateStats(currentFilteredSymbols);
    setStats(updatedStats);
  };

  const getSymbolTypeLabel = () => (selectedType === "아케인" ? "ARC" : "AUT");

  return (
    <div className="w-full border border-userBorder bg-white px-6 py-3 shadow-md dark:border-0 dark:bg-dark_bg_100 desktop:mt-3">
      <ButtonGroup className="w-full">
        {["아케인", "어센틱"].map((type) => (
          <Button
            key={type}
            className={`w-full rounded-none text-xs ${
              selectedType === type
                ? "bg-[#bdbbbc] text-black"
                : "hover:font-bold"
            }`}
            onClick={() => setSelectedType(type)}
            startContent={
              <Image
                src={`/images/item/${
                  type === "아케인" ? "arcane" : "authentic"
                }.png`}
                alt="Symbol Image"
                width={20}
                height={20}
              />
            }
          >
            {type}
          </Button>
        ))}
      </ButtonGroup>
      <div className="mt-3 text-center text-13px">
        <p>
          {getSymbolTypeLabel()}: +{stats.forceSum}
        </p>
        {filteredSymbols.length > 0 && (
          <p>
            {stats.statLabels}: +{stats.statsSum}
          </p>
        )}
      </div>
      <div className="flex flex-wrap">
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
    <div className="ml-1 mt-2 flex min-h-95px w-[30%] flex-col items-center bg-[#f5f5f6] px-3 py-2 text-xs dark:bg-[#2b2f31e8]">
      <Image
        src={symbol.symbol_icon}
        alt="Symbol Image"
        width={38}
        height={38}
        unoptimized
      />
      <div>Lv.{symbol.symbol_level}</div>
      {symbol.symbol_level === typeValue[selectedType] ? (
        <div>MAX</div>
      ) : (
        <div className="w-full">
          <Progress
            color="default"
            aria-label=""
            className="h-5px"
            value={
              (symbol.symbol_growth_count /
                symbol.symbol_require_growth_count) *
              100
            }
          />
          <p className="mt-1 text-center text-9px">
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
