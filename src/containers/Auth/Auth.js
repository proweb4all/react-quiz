import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button'
import './Auth.scss'

export default class Auth extends Component {
  loginHandler = () => {}
  registerHandler = () => {}
  submitHandler = e => {e.preventDefault()}
  
  render() {
    return (
      <div className='auth'>
          <div>
            <h1>Авторизация</h1>
            <form onSubmit={this.submitHandler} className='auth-form'>
              <input tipe='text' />
              <input tipe='text' />
              <Button type='success' onClick={this.loginHandler}>Войти</Button>
              <Button type='primary' onClick={this.registerHandler}>Регистрация</Button>
            </form>
          </div>
      </div>
    )
  }
}