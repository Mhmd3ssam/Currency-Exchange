import { useState, useEffect, useCallback } from "react";

import debounce from "lodash.debounce";

export function useCurrencyExchange() {
  const [currencyData, setCurrencyDate] = useState({
    amount: "1.0",
    fromCurrency: "",
    toCurrency: "",
  });
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [convertResult, setConvertResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
        );
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  const fetchExchangeRate = useCallback(
    debounce(async (from: string, to: string, amt: number) => {
      if (!from || !to || !amt) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyData.fromCurrency}.json`
        );
        const result = await response.json();
        const rate =
          result?.[currencyData.fromCurrency]?.[currencyData.toCurrency];

        setConvertResult(amt * rate.toFixed(8));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000),
    [currencyData.amount, currencyData.fromCurrency, currencyData.toCurrency]
  );

  useEffect(() => {
    if (
      currencyData.fromCurrency &&
      currencyData.toCurrency &&
      currencyData.amount
    ) {
      fetchExchangeRate(
        currencyData.fromCurrency,
        currencyData.toCurrency,
        currencyData.amount
      );
    }
  }, [currencyData, fetchExchangeRate]);

  return {
    currencyData,
    setCurrencyDate,
    currencies,
    convertResult,
    setConvertResult,
    isLoading,
  };
}
