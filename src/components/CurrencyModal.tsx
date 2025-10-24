import React, { useEffect, useState } from "react";
import { X, RefreshCw } from "lucide-react";
import CurrencyChart from "./CurrencyChart";
import { ExchangeRates, HistoricalDataPoint } from "@/types/currency";

const API_KEY = "fca_live_kJYwwrthUha9vutdDOarE9ETMt4Nd7wadI2OeEgC";
const BASE_URL = "https://api.freecurrencyapi.com/v1";

interface Props {
  baseCurrency: string;
  currencyCode: string;
  rates: ExchangeRates;
  onClose: () => void;
}

const CurrencyModal: React.FC<Props> = ({
  baseCurrency,
  currencyCode,
  rates,
  onClose,
}) => {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const today = new Date();
        const promises = [];
        for (let i = 13; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const ds = d.toISOString().split("T")[0];
          promises.push(
            fetch(
              `${BASE_URL}/historical?apikey=${API_KEY}&date=${ds}&base_currency=${baseCurrency}&currencies=${currencyCode}`
            )
              .then((r) => r.json())
              .then((res) => ({
                date: ds,
                rate: res.data[ds]?.[currencyCode] || 0,
              }))
          );
        }
        const result = await Promise.all(promises);
        setData(result.filter((r) => r.rate > 0));
      } catch {
        const mock = Array.from({ length: 14 }).map((_, i) => ({
          date: new Date(Date.now() - i * 86400000)
            .toISOString()
            .split("T")[0],
          rate: (rates[currencyCode] || 1) * (0.98 + Math.random() * 0.04),
        }));
        setData(mock.reverse());
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [currencyCode]);

  const stats = (() => {
    const ratesArr = data.map((d) => d.rate);
    return {
      highest: Math.max(...ratesArr),
      lowest: Math.min(...ratesArr),
      average: ratesArr.reduce((a, b) => a + b, 0) / ratesArr.length,
    };
  })();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {currencyCode} Exchange History
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <CurrencyChart data={data} />
              <div className="bg-gray-50 rounded-xl p-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Rate Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    Highest:{" "}
                    <span className="font-semibold">{stats.highest.toFixed(4)}</span>
                  </div>
                  <div>
                    Lowest:{" "}
                    <span className="font-semibold">{stats.lowest.toFixed(4)}</span>
                  </div>
                  <div>
                    Average:{" "}
                    <span className="font-semibold">{stats.average.toFixed(4)}</span>
                  </div>
                  <div>
                    Current:{" "}
                    <span className="font-semibold">
                      {rates[currencyCode]?.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyModal;