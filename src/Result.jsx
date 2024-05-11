import React from "react";
import { useSelector } from "react-redux";
import { selectQuestions } from "./questionsSlice";

const Result = ({ restartQuiz }) => {
  const questions = useSelector(selectQuestions);

  const score = questions.reduce((acc, currentValue) => {
    return currentValue.isCorrect ? acc + 1 : acc;
  }, 0);

  return (
    <div className="result-container">
      <h2>
        You have scored {score} / 10{" "}
        {score > 6 ? <span>🥳</span> : <span>🥹</span>}
      </h2>
      <button onClick={restartQuiz}>Try again</button>
    </div>
  );
};

export default Result;
