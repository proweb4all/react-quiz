import React from 'react'
import './MenuToggle.scss'

const MenuToggle = props => {
    const classes = [
        'menu-toggle fa',
        props.type
    ]
    if (props.isOpen) {
        classes.push('fa-times')
        classes.push('open')
    } else {
        classes.push('fa-bars')
    }
    return (
        <i className={classes.join(' ')} onClick={props.onClick} />
    )
}

export default MenuToggle