# react-simple-time-input

A simple time input that accepts time in flexible formats. It has support for 12 and 24 hours formats.

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
      time={time}
      clockMode={12}
      onValueChange={valueChanged} // called on blur
    />
  )
}
```

By default, it will append an `invalid-time` class to the input if the user is typing a time in invalid format. You can set your own invalid class name by passing a `invalidClassName` prop.