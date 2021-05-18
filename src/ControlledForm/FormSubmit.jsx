import React from 'react'
import PropTypes from 'prop-types'

const btnStyle = {
  backgroundColor: 'darkolivegreen',
  border: 'none',
  color: 'white',
  fontSize: '1rem',
  padding: '8px 16px'
}

const disabledBtnStyle = {
  ...btnStyle,
  opacity: '0.5'
}

const FormSubmit = ({ children, isComplete }) => {
  return (
    <button
      style={isComplete ? btnStyle : disabledBtnStyle}
      disabled={!isComplete}
    >
      {children || 'Submit'}
    </button>
  )
}

FormSubmit.displayName = 'FormSubmit'

FormSubmit.protoTypes = {
  children: PropTypes.any,
  isComplete: PropTypes.bool
}

export default FormSubmit
