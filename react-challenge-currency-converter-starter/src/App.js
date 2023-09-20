// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [firstSelect, setFirstSelect] = useState("EUR");
  const [secondSelect, setSecondSelect] = useState("USD");
  const [res, setRes] = useState("");

  console.log(input, firstSelect, secondSelect);

  useEffect(() => {
    async function Convert() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${firstSelect}&to=${secondSelect}`
      );
      const data = await res.json();
      setRes(data.rates[secondSelect]);
    }
    if (firstSelect !== secondSelect) Convert();
    else {
      setRes(input);
    }
  }, [input, firstSelect, secondSelect]);

  return (
    <div>
      <input
        type="number"
        onChange={(e) => {
          setInput(Number(e.target.value));
        }}
        value={input}
      />
      <select
        value={firstSelect}
        onChange={(e) => setFirstSelect(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={secondSelect}
        onChange={(e) => setSecondSelect(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {res} {secondSelect}
      </p>
    </div>
  );
}
