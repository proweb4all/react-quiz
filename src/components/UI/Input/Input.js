import React from 'react'
import './Input.scss'

const Input = props => {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`
    const classes = ['input']
    const isInvalid = ({valid, touched, shouldValidate}) => {
        return !valid && shouldValidate && touched
    }
    if (isInvalid(props)){
        classes.push('invalid')
    }
    return (
        <div className={classes.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange} />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || "Введите верное значение"}</span> : null
            }
        </div>
    )
}

export default Input