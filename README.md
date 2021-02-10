# react-simple-time-input

A simple time input that accepts times in flexible format. It has support for both 12- and 24-hour format.

[**View live demo**](https://citifyd.github.io/react-simple-time-input/)

![demo](demo.gif)

## Installation

`npm install react-simple-time-input --save`

## Usage

```jsx
import React, { useState } from 'react'
import SimpleTimeInput from 'react-simple-time-input'

function MyComponent () {
  const [time, setTime] = useState('14:00')

  const valueChanged = newValue => {
    setTime(newValue)
    alert(`Time changed to ${newValue}`)
  }

  return (
    <SimpleTimeInput
      value={time}
      clockMode={12}
      onValueChange={valueChanged} // called on blur
    />
  )
}
```

### Prop types

| Prop | Required | Type | Description |
| ---- | -------- | ---- | ----------- |
| `value` | Yes | String | The current value, always in 24-hour format (e.g. `14:00`) |
| `clockMode` | Yes | `12` or `24` (Number) | The clock input and display mode (12- or 24-hour format) |
| `as` | No | `elementType` | Type of component to be rendered, e.g. `as={TextField}`. If not passed, an HTML `input` will be used by default. |
| `onValueChange` | No | Function | Function to be called on blur event. It passes the interpreted time as argument. |
| `invalidClassName` | No | String | `className` appended to element when user is typing a time in invalid format. If not passed, the class name `invalid-time` will be used by default. |

Any additional prop passed is forwarded to the input component.

When `onChange` is used, the event is forwarded and an object is passed as the second argument with a `valid` flag and `time` with the time interpreted.