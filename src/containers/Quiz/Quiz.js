import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


export default class Quiz extends Component {
    state = {
        quiz: []
    }
    render() {
        return (
            <div className='quiz'>
                <h1>Quiz</h1>
                <ActiveQuiz />
            </div>
        )
    }
}