import React from "react";
import CurrencyCard from "./CurrencyCard";
import { Currency, ExchangeRates } from "@/types/currency";

interface Props {
  targetCurrencies: Currency[];
  rates: ExchangeRates;
  audAmount: number;
  onSelect: (code: string) => void;
}

const ConvertedList: React.FC<Props> = ({
  targetCurrencies,
  rates,
  audAmount,
  onSelect,
}) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Converted Amounts
    </h2>
    <div className="space-y-3">
      {targetCurrencies.map((c) => (
        <CurrencyCard
          key={c.code}
          currency={c}
          rate={rates[c.code]}
          amount={audAmount}
          onClick={() => onSelect(c.code)}
        />
      ))}
    </div>
  </div>
);

export default ConvertedList;