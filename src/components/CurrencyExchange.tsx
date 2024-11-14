"use client";

import { ArrowLeftRightIcon as ArrowsLeftRight } from "lucide-react";

import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useCurrencyExchange } from "../Hooks/useCurrencyExchange";

import BG from "../assets/BG.jpg";

interface Currencies {
  [key: string]: string;
}

function CurrencyExchange() {
  const {
    currencyData: { amount, fromCurrency, toCurrency },
    setCurrencyDate,
    currencies,
    convertResult,
    setConvertResult,
    isLoading,
  } = useCurrencyExchange();

  const handleSwap = () => {
    setCurrencyDate({
      amount,
      toCurrency: fromCurrency,
      fromCurrency: toCurrency,
    });
  };

  const handleReset = () => {
    setCurrencyDate({
      amount: "1.0",
      toCurrency: "",
      fromCurrency: "",
    });
    setConvertResult(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCurrencyDate({
        fromCurrency,
        toCurrency,
        amount: value === "" ? "0.0" : value,
      });
    }
  };
 
  const showReset = fromCurrency && toCurrency && amount !== "1.0";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/60 to-blue-800/60" />
      <Image
        src={BG}
        alt="Background"
        fill
        priority
        className="object-cover mix-blend-overlay opacity-20"
      />
      <div className="relative flex flex-col gap-y-16	 min-h-screen items-center justify-center p-4">
        <h1 className="text-center text-white	text-2xl font-bold text-gray-900 sm:text-3xl">
          Money Exchange
        </h1>
        <div className="w-full max-w-6xl rounded-lg bg-white p-10 ">
          <div className="rounded-lg bg-white p-6 ">
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.0"
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
                <Select
                  value={fromCurrency}
                  onValueChange={(value) => {
                    setCurrencyDate({
                      toCurrency,
                      amount,
                      fromCurrency: value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(currencies)?.map((currencyKey) => (
                      <SelectItem
                        key={currencyKey}
                        value={currencyKey}
                        disabled={currencyKey === toCurrency}
                      >
                        {(currencies as unknown as Currencies)[currencyKey] || currencyKey}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwap}
                  disabled={!fromCurrency || !toCurrency}
                  className="rounded-full"
                >
                  <ArrowsLeftRight className="h-4 w-4" />
                </Button>

                <Select
                  value={toCurrency}
                  onValueChange={(value) => {
                    setCurrencyDate({
                      amount,
                      fromCurrency,
                      toCurrency: value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(currencies)?.map((currencyKey) => (
                      <SelectItem
                        key={currencyKey}
                        value={currencyKey}
                        disabled={currencyKey === fromCurrency}
                      >
                        {(currencies as unknown as Currencies)[currencyKey] || currencyKey}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showReset && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="bg-[#2E4374] hover:bg-[#2E4374] hover:text-white max-w-[200px] text-white cursor-pointer w-28 py-6 rounded-lg text-lg font-normal"
                >
                  Reset
                </Button>
              )}

              {convertResult !== null && fromCurrency && toCurrency && (
                <div className="text-lg font-medium text-gray-900">
                  {isLoading ? (
                    <p>Converting...</p>
                  ) : (
                    <p>
                      {`${amount} ${fromCurrency.toLocaleUpperCase()} equals ${convertResult.toFixed(
                        8
                      )} ${toCurrency.toLocaleUpperCase()}`}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyExchange;
