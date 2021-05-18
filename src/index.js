import React from 'react'
import { render } from 'react-dom'
import { ControlledForm, Field, FormSubmit } from './ControlledForm'

import './style.css'

const App = () => (
  <ControlledForm onSubmit={(fields) => alert(JSON.stringify(fields, null, 2))}>
    <Field label="First Name" name="first" required={true} />
    <Field label="last Name" name="last" required={true} />
    <Field label="Email" name="email" required={true} />
    <Field label="Favorite Color" name="favorite_color" required={true} />

    <FormSubmit>All done!</FormSubmit>
  </ControlledForm>
)

render(<App />, document.getElementById('root'))
