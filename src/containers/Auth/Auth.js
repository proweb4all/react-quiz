import React, {Component} from 'react';
import is from 'is_js'
import Button from '../../components/UI/Button/Button'
import './Auth.scss'
import Input from '../../components/UI/Input/Input';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export default class Auth extends Component {
  
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }
  loginHandler = () => {}
  registerHandler = () => {}
  submitHandler = e => {e.preventDefault()}
  
  validateControl(value, validation) {
    if (!validation) return true
    let isValid = true
    if (validation.required) isValid = value !== '' && isValid
    if (validation.minLength) isValid = value.length >=validation.minLength && isValid
    if (validation.email) isValid = is.email(value) && isValid
    
    return isValid
  }
  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, event.target.value)
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value.trim(), control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls, isFormValid
    })
  }
  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName,ind) => {
      const contol = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + ind} 
          type={contol.type} 
          label={contol.label} 
          value={contol.value} 
          errorMessage={contol.errorMessage} 
          valid={contol.valid} 
          touched={contol.touched} 
          shouldValidate={!!contol.validation}
          validation={contol.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className='auth'>
          <div>
            <h1>Авторизация</h1>
            <form onSubmit={this.submitHandler} className='auth-form'>
              {this.renderInputs()}
              {/* <Input label='Email'/>
              <Input label='Пароль' errorMessage='Test' addStyle='invalid'/> */}
              <Button 
                type='success' 
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >Войти</Button>
              <Button 
                type='primary' 
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
              >Регистрация</Button>
            </form>
          </div>
      </div>
    )
  }
}