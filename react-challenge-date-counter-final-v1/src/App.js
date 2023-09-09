import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  
  const date = new Date();
  date.setDate(date.getDate()+count)

  
  function handlePrev() {
    setCount((c) => c - step);
  }
  function handleNext() {
    setCount((c) => c + step);
  }
  return (
    <>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>Step: {step}
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={handlePrev}>-</button>Count: {count}
        <button onClick={handleNext}>+</button>
      </div>
      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? count + " days from today is "
            : Math.abs(count) + " days ago was "}
        </span>
        <span>{date.toDateString()}</span>
      </p>
    </>
  );
}
