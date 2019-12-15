import React, {Component} from 'react';
import './QuizCreator.scss'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


export default class QuizCreator extends Component {
    submitHandler = event => {
      event.preventDefault()
    }
    addQuestionHandler = () => {}
    createQuizHandler = () => {}
    render() {
    return (
      <div className='quiz-creator'>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            <Input />
            <hr/>
            <Input />
            <Input />
            <Input />
            <Input />
            <select></select>
            <Button
              type='primary'
              onClick={this.addQuestionHandler}>
                Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.createQuizHandler}>
                Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}