import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  //states
  const [homeCurrency, setHomeCurrency] = useState("usd");
  const [foreignCurrency, setForeignCurrency] = useState("inr");
  const [allCurrency, setAllCurrency] = useState([]);
  const [output, setOutput] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  //function  to fetch the currency excahnge rates between to two countries
  const fetchCurrency = useCallback(async (homeCurrency, foreignCurrency) => {
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${homeCurrency}.json`
      );
      const data = await res.json();

      const conversionRates = data[homeCurrency];

      const conversion = conversionRates[foreignCurrency];
      setOutput(conversion);
    } catch (error) {
      console.log("failed fetching conversion", error);
    }
  });

  function swapCurrency() {
    const homeVal = homeCurrency;
    setHomeCurrency(foreignCurrency);
    setForeignCurrency(homeVal);
    setTo(from);
    setFrom(to);
  }

  //to get the currency keys for all countries while we load the website, runs only once per render
  useEffect(() => {
    const fnCurrency = async () => {
      const res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
      );
      const data = await res.json();
      const currencyKeys = Object.keys(data.usd);
      setAllCurrency(currencyKeys);
    };

    fnCurrency();
  }, []);

  useEffect(() => {
    fetchCurrency(homeCurrency, foreignCurrency);
    setTo(from * output);
  }, [homeCurrency, foreignCurrency, from, to]);

  return (
    <div className="flex justify-center items-center w-[100%]">
      <div className="flex flex-col items-center justify-center gap-5 mt-20 glass pt-10 pb-10 w-[500px] px-4 py-2 rounded-lg border-white">
        <div className="w-[100%] flex  flex-col gap-5 ">
          <div className="from w-[100%] flex justify-between w-[100%] px-2 bg-white  rounded p-4 ">
            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-400">
                From
              </label>
              <input
                type="number"
                placeholder="0"
                className="outline-none"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  console.log(from);
                }}
              />
            </div>
            <div className="flex flex-col items-end ">
              <label htmlFor="" className="text-gray-400">
                Currency type
              </label>
              <select
                name=""
                id="home"
                value={homeCurrency}
                className=" outline-none"
                onChange={(e) => {
                  setHomeCurrency(e.target.value);
                }}
              >
                {allCurrency ? (
                  allCurrency.map((currency, index) => (
                    <option key={index}>{currency}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>

          <div className="to w-[100%] flex justify-between w-[100%] px-2 bg-white  rounded p-4 ">
            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-400">
                To
              </label>
              <input
                type="number"
                placeholder="0"
                className="outline-none"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col items-end ">
              <label htmlFor="" className="text-gray-400">
                Currency type
              </label>
              <select
                name=""
                id="home"
                value={foreignCurrency}
                className=" outline-none"
                onChange={(e) => {
                  setForeignCurrency(e.target.value);
                }}
              >
                {allCurrency ? (
                  allCurrency.map((currency, index) => (
                    <option key={index}>{currency}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
        </div>
        <button className="bg-blue-500 rounded p-2" onClick={swapCurrency}>
          swap
        </button>
        <button className="text-xl font-semibold bg-blue-500 px-5 rounded py-2 text-white">{`Convert ${homeCurrency.toUpperCase()} to ${foreignCurrency.toUpperCase()}`}</button>
        <span className="text-2xl font-bold">{output}</span>
      </div>
    </div>
  );
}

export default App;
