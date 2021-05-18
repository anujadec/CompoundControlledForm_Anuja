import React, { cloneElement } from 'react'

import PropTypes from 'prop-types'

const style = {
  maxWidth: '600px'
}

export default class ControlledForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.calculateState()
  }

  static propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func.isRequired
  }

  calculateState() {
    let fieldState = {}
    let validCount = 0

    React.Children.forEach(this.props.children, (child) => {
      if (child.type.displayName === 'Field') {
        if (!child.props.required || child.props.value) validCount += 1

        fieldState[child.props.name] = {
          value: '',
          error: false,
          touched: false,
          ...child.props
        }
      }
    })

    return {
      fields: fieldState,
      isComplete: validCount === Object.keys(fieldState).length
    }
  }

  checkComplete() {
    const { fields } = this.state
    const errors = Object.values(fields).filter(
      ({ error, required, value }) => required && (error || !value)
    )
    return !errors.length
  }

  handleBlur = (e) => {
    const name = e.target.name
    this.setState(({ fields }) => {
      const field = fields[name]
      return {
        fields: {
          ...fields,
          [name]: {
            ...field,
            touched: true,
            error: field.required && !field.value
          }
        }
      }
    })
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(({ fields }) => {
      const field = fields[name]
      const error = field.required && !value
      return {
        fields: {
          ...fields,
          [name]: { ...fields[name], value, error }
        },
        isComplete: error ? false : this.checkComplete()
      }
    })
  }

  handleSubmit = (e) => {
    const { fields } = this.state
    e.preventDefault()
    this.props.onSubmit(
      Object.keys(fields).reduce(
        (obj, key) => ({
          ...obj,
          [key]: fields[key].value
        }),
        {}
      )
    )
  }

  render() {
    const { fields, isComplete } = this.state
    return (
      <form style={style} noValidate onSubmit={this.handleSubmit}>
        {React.Children.map(this.props.children, (child) => {
          switch (child.type.displayName) {
            case 'Field':
              return cloneElement(child, {
                ...fields[child.props.name],
                onBlur: this.handleBlur,
                onChange: this.handleChange
              })
            case 'FormSubmit':
              return cloneElement(child, { isComplete })
            default:
              return child
          }
        })}
      </form>
    )
  }
}
