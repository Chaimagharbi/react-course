import { useEffect, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Steps></Steps>
      <Steps></Steps>
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const [OpenImg, setOpenImg] = useState("×");

  function handlePrevious() {
    step === 1 ? setStep((s) => s) : setStep((s) => s - 1);
  }

  function handleNext() {
    step === 3 ? setStep((s) => s) : setStep((s) => s + 1);
  }

  function handleIsOpen() {
    setIsOpen((io) => !io);
    isOpen ? setOpenImg("+") : setOpenImg("×");
  }

  return (
    <div>
      <button className="close" onClick={handleIsOpen}>
        {OpenImg}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step === 1 ? "active" : null}`}>1</div>
            <div className={`${step === 2 ? "active" : null}`}>2</div>
            <div className={`${step === 3 ? "active" : null}`}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
