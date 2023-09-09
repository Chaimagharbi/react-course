import "./styles.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);
 
  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <Item
          title={faq.title}
          key={faq.title}
          num={i}
          isOpen={i === curOpen}
          onClick={setCurOpen}
        >
          {faq.text}
        </Item>
      ))}
      <Item
        title={"thinking in React"}
        key={"thinking in React"}
        num={23}
        isOpen={23 === curOpen}
        onClick={() => handleClick(23)}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        laboriosam illo aperiam, error enim tenetur nisi repudiandae quaerat
        similique eius, quo alias unde pariatur commodi non laborum atque
        nesciunt veritatis.
      </Item>
    </div>
  );
}

function Item({ title, num, isOpen, onClick, children }) {
  function handleToggle() {
    onClick(isOpen? null: num);
  }
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <span className="number">{String(num + 1).padStart(2, "0")}</span>
      <span className={`title ${isOpen ? "text" : ""}`}>{title}</span>
      <span className="icon ">{isOpen ? "-" : "+"}</span>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
