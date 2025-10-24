import React from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  audAmount: number;
  onChange: (value: number) => void;
  onRefresh: () => void;
  loading: boolean;
}

const CurrencyInput: React.FC<Props> = ({
  audAmount,
  onChange,
  onRefresh,
  loading,
}) => (
  <div className="mb-8">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Amount in AUD
    </label>
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-semibold">
          A$
        </span>
        <input
          type="number"
          value={audAmount}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-12 pr-4 py-4 text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  </div>
);

export default CurrencyInput;