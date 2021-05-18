# Controlled Form (compound component)

Check out the [final result](https://50no4w85wx.codesandbox.io/)
to see the expected look and behavior.

Convert the existing `ControlledForm` and the field elements to work as
a compound component.

## Tips

- group all of the components needed for the compound component into a folder
    - export all the ones needed to build a form as named exports in an *index.js* file
      in the new folder
- make a separate component for the submit button
- for the form to be able to pass the right data the field components need to be
  immediate children of the form. So create a main field component that puts all
  the smaller components together and can recieve props from the form.
- make sure to add displayNames to the field and the submit button
- the form should still keep all the same state, but will no longer use the `fields` prop
- generate initial state from the child fields
- the form should use `React.Children` and `cloneElement` to pass handlers + data to fields
    - only pass a field the data it needs (check the field's `name` prop to know what data to pass)
    - pass the `isComplete` state to the submit button