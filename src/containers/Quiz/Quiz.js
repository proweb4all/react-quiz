import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


export default class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого хрена?',
                rightAnswerId: 3,
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
                rightAnswerId: 2,
                answers: [
                    {text: 'Зеленое', id: 1},
                    {text: 'Синее', id: 2},
                    {text: 'Красное', id: 3},
                    {text: 'Ядреного хрена', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHandler = answerId => {
        console.log('answerId:', answerId)
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    alert('Опрос окончен')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
        
    }
    isQuizFinished = () => this.state.activeQuestion + 1 === this.state.quiz.length
    // isQuizFinished() {return this.state.activeQuestion + 1 === this.state.quiz.length}

    render() {
        return (
            <div className='quiz'>
                <h1>Ответьте на все вопросы</h1>
                <ActiveQuiz 
                    quiz={this.state.quiz[this.state.activeQuestion]} 
                    onAnswerClick={this.onAnswerClickHandler}
                    questionNumber={this.state.quiz.length}
                    activeQuestion={this.state.activeQuestion + 1}
                    answerState={this.state.answerState}
                />
            </div>
        )
    }
}