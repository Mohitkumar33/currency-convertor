"use client";
import React, { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";
import ConvertedList from "./ConvertedList";
import { ExchangeRates } from "@/types/currency";
import { TARGET_CURRENCIES } from "@/constants/app.const";
import CurrencyModal from "./CurrencyModal";

const CurrencyConverter: React.FC = () => {
  const [audAmount, setAudAmount] = useState(100);
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const fetchRates = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const codes = TARGET_CURRENCIES.map((c) => c.code).join(",");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/latest?apikey=${process.env.NEXT_PUBLIC_API_KEY}&base_currency=AUD&currencies=${codes}`
      );
      if (!response.ok) throw new Error("Failed to fetch rates");
      const result = await response.json();
      setRates(result.data);
    } catch (err) {
      setError("API error — using fallback data");
      setRates({ USD: 0.65, EUR: 0.6, GBP: 0.51, JPY: 98.5, CAD: 0.9 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Currency Converter
          </h1>
          <p className="text-gray-600">
            Convert Australian Dollar to major currencies
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <CurrencyInput
            audAmount={audAmount}
            onChange={setAudAmount}
            onRefresh={fetchRates}
            loading={loading}
          />

          {error && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              {error}
            </div>
          )}

          <ConvertedList
            targetCurrencies={TARGET_CURRENCIES}
            rates={rates}
            audAmount={audAmount}
            onSelect={setSelectedCurrency}
          />
        </div>
      </div>

      {selectedCurrency && (
        <CurrencyModal
          baseCurrency="AUD"
          currencyCode={selectedCurrency}
          rates={rates}
          onClose={() => setSelectedCurrency(null)}
        />
      )}
    </div>
  );
};

export default CurrencyConverter;
