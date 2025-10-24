import React from "react";
import { TrendingUp } from "lucide-react";
import { Currency } from "@/types/currency";

interface Props {
  currency: Currency;
  rate?: number;
  amount: number;
  onClick: () => void;
}

const CurrencyCard: React.FC<Props> = ({ currency, rate, amount, onClick }) => {
  const converted = rate ? (amount * rate).toFixed(2) : "0.00";
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 cursor-pointer transition-all hover:shadow-md group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {currency.code[0]}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{currency.code}</div>
          <div className="text-sm text-gray-500">{currency.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            {currency.symbol}
            {converted}
          </div>
          <div className="text-sm text-gray-500">
            Rate: {rate ? rate.toFixed(4) : "N/A"}
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );
};

export default CurrencyCard;