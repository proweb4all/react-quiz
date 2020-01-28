import React, { Component } from 'react'
import './Drawer.scss'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {
  renderLinks(links) {
    return (links.map((link, ind) => {
      return (
        <li key={ind}>
          <NavLink
            to={link.to}
            activeClassName='actived'
            exact={links.exact}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    }))
  }
  render() {
    const classes = ['drawer']
    if (!this.props.isOpen) {
      classes.push('close')
    }
    const links = [
      { to: '/', label: 'Список', exact: true }
    ]
if (this.props.isAuthenticated) {
  links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
  links.push({ to: '/logout', label: 'Выйти', exact: false })
} else {
  links.push({ to: '/auth', label: 'Авторизация', exact: false })
}

    return (
      <>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }
}

export default Drawer