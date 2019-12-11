import React from 'react'
import './FinishedQuiz.scss'
import {Link} from 'react-router-dom'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
    console.log(props.results)
    const successCount = Object.values(props.results).filter((value) => value === 'success').length
    return (
        <div className='finished'>
            <ul className='finished__ul'>
                {props.quiz.map((quizItem, index) => {
                    const classes = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times error' : 'fa-check success'
                    ]
                    return (
                        <li key={index}>
                            <span>{index + 1}.&nbsp;&nbsp;{quizItem.question}</span>
                            <i className={classes.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button className='' type='primary' onClick={props.onRetry}>Повторить</Button>
                <Link to='/'>
                    <Button className='' type='success' onClick={props.onRetry}>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz