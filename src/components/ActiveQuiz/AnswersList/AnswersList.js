import React from 'react'
import './AnswersList.scss'
import AnswersItem from './AnswersItem/AnswersItem'

const AnswersList = props => (
    <ul className='answers-list'>
        {props.answers.map((answer, index) => {
            return (
                <AnswersItem 
                    answer={answer} key={index}
                    onAnswerClick={props.onAnswerClick} 
                    answerState={props.answerState ? props.answerState[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList