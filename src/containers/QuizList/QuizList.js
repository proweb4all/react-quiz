import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './QuizList.scss'
import Loader from '../../components/UI/Loader/Loader';
// import axios from '../../axios/axios-quiz'
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <NavLink to={'/quiz/' + quiz.id} className={'quiz-list__li'} key={quiz.id}>
          {quiz.name}
        </NavLink>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className='quiz-list'>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0
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

function mapStateToProps(state) {
  return {
    name: state.quiz.name,
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)