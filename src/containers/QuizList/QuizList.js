import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import './QuizList.scss'
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends Component {
  
  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <NavLink to={'/quiz/' + quiz.id} className={'quiz-list__li'} key={quiz.id}>
          {quiz.name}
        </NavLink>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://react-quiz-d285f.firebaseio.com/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      this.setState({
        quizes, loading: false
      })
    } catch (e){
      console.log(e)
    }
    //.then(response => {
    //   console.log(response)
    // })
  }

  render() {
    return (
      <div className='quiz-list'>
        <div>
          <h1>Список тестов</h1>
          {this.state.loading 
            ? <Loader /> 
            : <ul>
                {this.renderQuizes()}
              </ul>
          }
        </div>
      </div>
    )
  }
}