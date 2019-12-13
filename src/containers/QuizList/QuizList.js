import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './QuizList.scss'

export default class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, ind) => {
      return (
        <NavLink to={'/quiz/' + quiz} className={'quiz-list__li'} key={ind}>
          Test {quiz}
        </NavLink>
      )
    })
  }
  render() {
    return (
      <div className='quiz-list'>
        <div>
          <h1>Список тестов</h1>
          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}