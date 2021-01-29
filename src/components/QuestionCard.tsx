import React from 'react'
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type props = {
    question: string
    options: string[]
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNumber: number
    totalQuestions: number
}

const QuestionCard: React.FC<props> = ({question, options, callback, userAnswer, totalQuestions, questionNumber}) => {
    return (
        <Wrapper>
            <p className='number'>Question {questionNumber}/{totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>
                {options.map((item) => {
                    return(
                        <ButtonWrapper correct={userAnswer?.correctAnswer === item}
                        userClicked={userAnswer?.answer === item} key={item}>
                            <button value={item} disabled={userAnswer ? true : false} onClick={callback}><span dangerouslySetInnerHTML={{__html: item}}></span></button>
                        </ButtonWrapper>
                    )
                })}
            </div>
        </Wrapper>
    )
}

export default QuestionCard