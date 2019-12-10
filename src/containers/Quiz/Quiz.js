import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


export default class Quiz extends Component {
    state = {
        results: {},

        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого хрена?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Патамушта!', id: 1},
                    {text: 'А чо нет!', id: 2},
                    {text: 'Как завещал Великий Ленин!', id: 3},
                    {text: 'Ядреного хрена!', id: 4}
                ]
            },
            {
                id: 2,
                question: 'Какого цвета небо?',
                rightAnswerId: 3,
                answers: [
                    {text: 'Зеленое', id: 1},
                    {text: 'Красное', id: 2},
                    {text: 'Синее', id: 3},
                    {text: 'Ядреного хрена', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHandler = answerId => {
        // console.log('answerState:', this.state.answerState)

        if (this.state.answerState && Object.values(this.state.answerState)[0] === 'success') return
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    // alert('Опрос окончен')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
        
    }
    isQuizFinished = () => this.state.activeQuestion + 1 === this.state.quiz.length
    // isQuizFinished() {return this.state.activeQuestion + 1 === this.state.quiz.length}
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    render() {
        return (
            <div className='quiz'>
                <h1>Ответьте на все вопросы</h1>
                { this.state.isFinished 
                    ? <FinishedQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                    /> 
                    : <ActiveQuiz 
                        quiz={this.state.quiz[this.state.activeQuestion]} 
                        onAnswerClick={this.onAnswerClickHandler}
                        questionNumber={this.state.quiz.length}
                        activeQuestion={this.state.activeQuestion + 1}
                        answerState={this.state.answerState}
                    />
                }
            </div>
        )
    }
}