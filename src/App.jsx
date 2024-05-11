import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import Result from "./Result";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "./questionsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const displayResult = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setShowResult(false);
    dispatch(fetchQuestions());
  };

  return (
    <main>
      {showResult ? (
        <Result restartQuiz={restartQuiz} />
      ) : (
        <Quiz displayResult={displayResult} />
      )}

      <ToastContainer />
    </main>
  );
};

export default App;
