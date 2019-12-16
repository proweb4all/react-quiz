import React, {Component, Fragment} from 'react';
import './QuizCreator.scss'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {createControl} from '../../form/formFramework';

function createOptionControl(number){
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Введите непустой вариант',
    id: number
  }, {required: true})
}
function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Введите непустой вопрос'
    }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  }


  submitHandler = event => {
    event.preventDefault()
  }
  addQuestionHandler = () => {}
  createQuizHandler = () => {}
  changeHandler = (value, controlName) => {}
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, ind) => {
      const contol = this.state.formControls[controlName]
      return (
        <Fragment key={controlName + ind}>
          <Input 
            label={contol.label} 
            value={contol.value} 
            errorMessage={contol.errorMessage} 
            valid={contol.valid} 
            touched={contol.touched} 
            shouldValidate={!!contol.validation}
            validation={contol.validation}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {ind === 0 ? <hr/> : null }
        </Fragment>
      )
    })
  } 
  render() {
    return (
      <div className='quiz-creator'>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
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