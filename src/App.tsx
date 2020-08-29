import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { QuestionState, Difficulty, Category } from './API';

import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  let categoryList: Array<any> = [];
  let difficultyList: Array<any> = [];

  Object.entries(Category).forEach(item => {
    categoryList.push(<option value={item[1]}>{item[0]}</option>)});

  Object.entries(Difficulty).forEach(item => {
    difficultyList.push(<option value={item[1]}>{item[1]}</option>)});

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const handleCategoryChange = () => {
    const userCategory = (document.getElementById("category") as HTMLInputElement).value;
    setCategory(userCategory);
  }

  const handleDifficultyChange = () => {
    const userDifficulty = (document.getElementById("difficulty") as HTMLInputElement).value;
    setDifficulty(userDifficulty);
  }


  const startTrivia = async() => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty,
      category
    );
    console.log(newQuestions);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user's answer
      const answer = e.currentTarget.value;
      // check against correct answer
      const correct = questions[number].correct_answer === answer;
      // add to score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // save answer in array for user userAnswers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move to next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
    <h1>TRIVIA QUIZ</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <>
      <select id="category" onChange={handleCategoryChange}>
      {categoryList}
      </select>
      <select id="difficulty" onChange={handleDifficultyChange}>
      {difficultyList}
      </select>
      <button className="start" onClick={startTrivia}>
      Start
      </button>
      </>
    ) : null}
    {!gameOver ?
      <p className="score">Score: {score}</p> : null}
    {loading ? <p>Loading Questions...</p> : null}
    {!loading && !gameOver && (
      <QuestionCard
      questionNum={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answer={questions[number].answers}
      correctOne={questions[number].correct_answer}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
      /> )
    }
    {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
      <button className="next" onClick={nextQuestion}>
      Next Question
      </button>
     ) : null}
    </Wrapper>
    </>
  );
};

export default App;
