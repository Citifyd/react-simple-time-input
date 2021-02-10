'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { parseInputChange, formatTimeForDisplay } from 'simple-time-input-engine'

const SimpleTimeInput = React.forwardRef(({
  as: InputComponent,
  value,
  onValueChange,
  onBlur,
  onChange,
  clockMode,
  className,
  invalidClassName,
  ...inputProps
}, ref) => {
  const [time, setTime] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    const time = value || ''
    setTime(time)
  }, [value])

  useEffect(() => refreshInput({ time, clockMode }), [time, clockMode])

  const refreshInput = useCallback(({ time, clockMode }) => {
    setIsInvalid(false)
    setInputValue(formatTimeForDisplay({ time, clockMode }))
  })

  const updateTimeBasedOnInput = useCallback(event => {
    const { valid, time: newTime } = parseInputChange({
      newValue: event.target.value,
      previousTime: time,
      clockMode
    })

    if (!valid || newTime === time) {
      refreshInput({ time, clockMode })
    }

    if (valid && newTime !== time) {
      setTime(newTime)
      if (onValueChange) {
        onValueChange(newTime)
      }
    }

    // forward original event
    if (onBlur) {
      onBlur(event)
    }
  }, [time, clockMode])

  const onInputChange = useCallback(event => {
    const { value } = event.target
    setInputValue(value)

    const { valid, time } = parseInputChange({ newValue: value, previousTime: time, clockMode })
    setIsInvalid(!valid)

    // forward original event
    if (onChange) {
      onChange(event, { valid, time })
    }
  }, [time, clockMode])

  const classNames = [
    className,
    isInvalid ? invalidClassName : null
  ].filter(className => typeof className === 'string').join(' ')

  return (
    <InputComponent
      {...inputProps}
      ref={ref}
      type='text'
      onBlur={updateTimeBasedOnInput}
      onChange={onInputChange}
      className={classNames}
      value={inputValue}
    />
  )
})

SimpleTimeInput.defaultProps = {
  clockMode: 12,
  invalidClassName: 'invalid-time',
  as: 'input'
}

SimpleTimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  clockMode: PropTypes.oneOf([12, 24]).isRequired,
  className: PropTypes.string,
  invalidClassName: PropTypes.string,
  as: PropTypes.elementType
}

export default SimpleTimeInput
