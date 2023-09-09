import "./styles.css";
import { useState } from "react";
export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

/*
DO THIS IF ONE OR MORE CARDS CAN BE SELECTED

function FlashCards() {
  return (
    <div className="flashcards">
      {questions.map((question) => (
        <FlashCard question={question} key={question.id}></FlashCard>
      ))}
    </div>
  );
}

function FlashCard({ question }) {
  const [isSelected, setIsSelected] = useState(false);
  return <div onClick={() =>setIsSelected((sel) => !sel)} className={isSelected? "selected": ""}>{isSelected? question.answer: question.question}</div>;
}
*/

//DO THIS IF ONLY ONE CARD CAN BE SELECTED

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId? id: null)
  }
  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div className={selectedId === question.id? "selected" : ""} key={question.id} onClick={() =>handleClick(question.id)}>{selectedId === question.id? question.answer : question.question}</div>
      ))}
    </div>
  );
}