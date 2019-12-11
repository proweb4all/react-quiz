import React, {Component} from 'react'
import './Drawer.scss'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}
]

class Drawer extends Component {
    renderLinks() {
        return (links.map((link, ind) => {
            return (
                <li key={ind}>
                    <NavLink 
                        className='active' 
                        to={link.to} 
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
        return (
            <>
            <nav className={classes.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }
}

export default Drawer