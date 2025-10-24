"use client";
import React, { useState, useEffect } from "react";
import CurrencyInput from "./CurrencyInput";

const CurrencyConverter: React.FC = () => {
  const [audAmount, setAudAmount] = useState(100);

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
            onRefresh={() => {}}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
