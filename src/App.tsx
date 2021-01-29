import React, { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import { QuestionState, Difficulty, fetchQuizQuestions } from './API'
import { Wrapper } from './App.styles'

export type AnswerObject = {
  question: string
  answer: string
  isAnswerCorrect: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [quizOver, setQuizOver] = useState(true)

  console.log(questions)

  const startQuizHandler = async () => {
    //set initial state values
    setLoading(true)
    setQuizOver(false)
    
    //send API call
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    
    //set remaining intital state values
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(!quizOver) {
      //receive answer from user
      const answer = event.currentTarget.value
      //check answer
      const isAnswerCorrect = questions[number].correct_answer === answer
      //incr score if answer correct
      if(isAnswerCorrect)
        setScore(score+1)
      //store answer in userAnswers array
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        isAnswerCorrect: isAnswerCorrect,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers([...userAnswers, answerObject])
    }
  }

  const nextQuestionHandler = () => {
    const nextQuestionNumber = number + 1
    if(nextQuestionNumber === TOTAL_QUESTIONS) {
      setQuizOver(true)
    }
    else {
      setNumber(nextQuestionNumber)
    }
  }

  return (
    <Wrapper className="App">
      <h1>THE ULTIMATE GK QUIZ</h1>
      {quizOver ? <button className='start' onClick={startQuizHandler}>START</button> : null}
      {userAnswers.length === TOTAL_QUESTIONS ? <button className='start' onClick={startQuizHandler}>PLAY AGAIN</button> : null}
      <p className='score'>Score: {score}</p>
      {loading ? <p>Loading questions</p> : null}
      {!loading && !quizOver ?
        <QuestionCard
        questionNumber={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        options={questions[number].options}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswerHandler} />
      : null}
      {!loading && !quizOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? <button className='next' onClick={nextQuestionHandler}>Next Question</button> : null}
    </Wrapper>
  );
}

export default App
