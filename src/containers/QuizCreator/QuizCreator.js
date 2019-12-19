import React, {Component, Fragment} from 'react'
import './QuizCreator.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Select from '../../components/UI/Select/Select'
import axios from '../../axios/axios-quiz'


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
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }


  submitHandler = event => {
    event.preventDefault()
  }
  addQuestionHandler = event => {
    event.preventDefault()
    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1
    const {question, option1, option2, option3, option4} =this.state.formControls
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    }
    quiz.push(questionItem)
    this.setState({
      quiz,
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()
    })
  }
  createQuizHandler = async event => {
    event.preventDefault()
    try {
      await axios.post('/quizes.json', this.state.quiz)
      this.setState({
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()        
      })
    } catch (e) {
      console.log(e)
    }
    // axios.post('https://react-quiz-d285f.firebaseio.com/quizes.json', this.state.quiz)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))
  }
  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })

  }
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
  selectChangeHandler = event => {
    console.log(event.target.value)
    this.setState({
      rightAnswerId: +event.target.value
    })
  }
  render() {
    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 'Вариант 1', value: 1},
        {text: 'Вариант 2', value: 2},
        {text: 'Вариант 3', value: 3},
        {text: 'Вариант 4', value: 4}
      ]}
    />
    return (
      <div className='quiz-creator'>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
              >
                Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
              >
                Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}