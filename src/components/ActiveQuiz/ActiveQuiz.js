import React from 'react'
import './ActiveQuiz.scss'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className='active-quiz'>
        <p>{props.activeQuestion} из {props.questionNumber}.<strong>{props.quiz.question}</strong></p>
        <AnswersList 
            answers={props.quiz.answers}
            onAnswerClick={props.onAnswerClick}
            answerState={props.answerState}
        />
    </div>
)

export default ActiveQuiz