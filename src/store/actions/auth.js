import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";
import axios from '../../axios/axios-quiz'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClrK-2_xivaYxfBHiCvKt7hWAhJN474fw";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClrK-2_xivaYxfBHiCvKt7hWAhJN474fw";
    }
    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

// export function finishCreateQuiz() {
//     return async (dispatch, getState) => {
//         await axios.post('/quizes.json', getState().create.quiz)
//         dispatch(resetQuizCreation())
//     }
// }
