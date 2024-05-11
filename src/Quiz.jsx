import React from "react";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIndex,
  selectCurrentQuestion,
  selectCurrentQuestionIndex,
} from "./questionsSlice";

const Quiz = ({ displayResult }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectCurrentQuestion);
  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);

  const handleNextQuestion = () => {
    dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
  };

  return (
    <div className="quiz-container">
      <Question />
      <div className="question-row question-action">
        {currentQuestionIndex < 9 ? (
          <button
            disabled={!currentQuestion?.isAttempted}
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        ) : (
          <button
            disabled={!currentQuestion?.isAttempted}
            onClick={displayResult}
          >
            Get Result
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
