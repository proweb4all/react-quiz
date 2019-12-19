import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'



export default class Quiz extends Component {
    state = {
        results: {},

        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
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

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className='quiz'>
                <h1>Ответьте на все вопросы</h1>
                { this.state.loading 
                    ? <Loader />
                    : this.state.isFinished 
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