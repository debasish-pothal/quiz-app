import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAnswer,
  selectCurrentQuestion,
  selectCurrentQuestionIndex,
} from "./questionsSlice";
import { toast } from "react-toastify";

const Question = () => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectCurrentQuestion);
  const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);

  const getOptionClasses = (index, ans) => {
    const classes = ["option", `option${index}`];

    if (currentQuestion.isAttempted) {
      if (ans === currentQuestion.correct_answer) {
        classes.push("right-option");
      } else {
        classes.push("wrong-option");
      }
    }

    return classes.join(" ");
  };

  const handleSubmitAnswer = (answer) => {
    if (!currentQuestion.isAttempted) {
      dispatch(checkAnswer(answer));

      if (answer === currentQuestion.correct_answer) {
        toast.success("Your answer is correct 🥳");
      } else {
        toast.error("Your answer is wrong 🥹");
      }
    } else {
      toast.error("You have already submitted your answer 🤯");
    }
  };

  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="question-row question-title">
        <span className="question-text">{currentQuestion.question}</span>
        <span className="question-serial">{currentQuestionIndex + 1}/10</span>
      </div>
      <div className="question-row question-options">
        {currentQuestion.options.map((option, index) => (
          <div
            key={`option-${index}`}
            className={getOptionClasses(index + 1, option)}
            onClick={() => handleSubmitAnswer(option)}
          >
            <span className="option-serial">{index + 1}</span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
