import React from 'react'
import PropTypes from 'prop-types'
import FieldError from './FieldError'
import FormRow from './FormRow'

const labelStyle = {
  display: 'block',
  marginBottom: '8px'
}

const fieldStyle = {
  width: '100%',
  height: '36px',
  border: '1px solid #999',
  fontSize: '1rem',
  paddingLeft: '8px'
}

const fieldErrStyle = {
  ...fieldStyle,
  borderColor: 'red'
}

const Field = ({ error, label, required, touched, ...rest }) => (
  <FormRow>
    {label && (
      <label style={labelStyle}>
        {label} {required && <span>*</span>}
      </label>
    )}
    <input
      type="text"
      {...rest}
      style={touched && error ? fieldErrStyle : fieldStyle}
    />
    {touched && error && <FieldError />}
  </FormRow>
)

Field.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  required: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.string
}
Field.displayName = 'Field'

export default Field
