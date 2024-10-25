import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleButtonClick = (value) => {
    if (value === "clear") {
      setInput("");
      setOutput(null);
      setIsEvaluated(false);
    } else if (value === "backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const result = eval(input.replace("×", "*").replace("÷", "/"));
        setOutput(result);
        setIsEvaluated(true);
      } catch (error) {
        setOutput("Error");
      }
    } else if (value === "brackets") {
      const lastChar = input.slice(-1);
      if (lastChar !== "(" && (input.match(/\(/g) || []).length <= (input.match(/\)/g) || []).length) {
        setInput((prev) => prev + "(");
      } else {
        setInput((prev) => prev + ")");
      }
    } else {
      if (isEvaluated && !isNaN(value)) {
        setInput(value);
        setIsEvaluated(false);
      } else {
        setInput((prev) => prev + value);
      }
    }
  };

  const cleanDisplay = (str) => str.replace(/\*/g, "×").replace(/\//g, "÷");

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{cleanDisplay(input)}</div>
        <div className="output">{output}</div>
      </div>
      <div className="keys">
        {["AC", "brackets", "%", "/"].map((key) => (
          <button key={key} onClick={() => handleButtonClick(key === "AC" ? "clear" : key)} className="action">
            {key === "/" ? "÷" : key === "brackets" ? "( )" : key}
          </button>
        ))}
        {["7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "backspace", "0", ".", "="].map((key) => (
          <button key={key} onClick={() => handleButtonClick(key)} className={["*", "-", "+", "="].includes(key) ? "operator" : ""}>
            {key === "*" ? "×" : key === "backspace" ? "⌫" : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
