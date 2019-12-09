import React from 'react'
import './AnswersItem.scss'

const AnswersItem = props => {
    const classes = ['answers-item']
    if (props.answerState) {
        classes.push(props.answerState)
    }
    return (
        <li className={classes.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    )
}

export default AnswersItem