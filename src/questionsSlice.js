import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const formatQuestions = (unformattedQuestions) => {
  return unformattedQuestions.map((q) => {
    q.options = [q.correct_answer, ...q.incorrect_answers].sort(
      () => Math.random() - 0.5
    );

    q.isAttempted = false;
    q.isCorrect = false;

    return q;
  });
};

// Define a thunk to fetch questions from an API
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    );

    return response.data.results;
  }
);

// Check answer after user click on any answer
export const checkAnswer = (answer) => (dispatch, getState) => {
  const state = getState();
  const { data, currentQuestionIndex } = state.questions;
  const currentQuestion = data[currentQuestionIndex];
  const isCorrect = currentQuestion.correct_answer === answer;

  // Update the question with the result
  const updatedQuestion = {
    ...currentQuestion,
    isCorrect: isCorrect,
    isAttempted: true,
  };

  // Update the state with the updated question
  const updatedData = [...data];
  updatedData[currentQuestionIndex] = updatedQuestion;

  dispatch(setQuestionData(updatedData));
};

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    data: [],
    currentQuestionIndex: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setQuestionData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = formatQuestions(action.payload);
        state.currentQuestionIndex = 0;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentQuestionIndex, setQuestionData } =
  questionsSlice.actions;

export const selectQuestions = (state) => state.questions.data;

export const selectCurrentQuestion = (state) => {
  const { data, currentQuestionIndex } = state.questions;
  return data[currentQuestionIndex];
};

export const selectCurrentQuestionIndex = (state) =>
  state.questions.currentQuestionIndex;

export const selectQuestionsStatus = (state) => state.questions.status;

export const selectQuestionsError = (state) => state.questions.error;

export default questionsSlice.reducer;
