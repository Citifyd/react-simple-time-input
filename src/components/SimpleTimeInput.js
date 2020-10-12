'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { parseInputChange, formatTimeForDisplay } from 'simple-time-input-engine'

function SimpleTimeInput ({
  value,
  onValueChange,
  clockMode,
  className,
  invalidClass,
  ...inputProps
}) {
  const [time, setTime] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [lastReset, setLastReset] = useState(null)

  useEffect(() => {
    const time = value || ''
    setTime(time)
  }, [value])

  useEffect(() => {
    setIsInvalid(false)
    setInputValue(formatTimeForDisplay({ time, clockMode }))
  }, [clockMode, time, lastReset])

  const updateTimeBasedOnInput = useCallback(event => {
    const { valid, time: newTime } = parseInputChange({
      newValue: event.target.value,
      previousTime: time,
      clockMode
    })

    if (!valid) {
      // if user blurs with invalid value, roll back input value to last valid informed
      setLastReset(new Date())
    } else if (newTime !== time) {
      setTime(newTime)
      if (onValueChange) {
        onValueChange(newTime)
      }
    }
  }, [time, clockMode])

  const onInputChange = useCallback(event => {
    const { value } = event.target
    setInputValue(value)

    const { valid } = parseInputChange({ newValue: value, previousTime: time, clockMode })
    setIsInvalid(!valid)
  }, [time, clockMode])

  const classNames = [
    className,
    isInvalid ? invalidClass : null
  ].filter(className => typeof className === 'string').join(' ')

  return (
    <input
      {...inputProps}
      type='text'
      onBlur={updateTimeBasedOnInput}
      onChange={onInputChange}
      className={classNames}
      value={inputValue}
    />
  )
}

SimpleTimeInput.defaultProps = {
  clockMode: 12,
  invalidClass: 'invalid-time'
}

SimpleTimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  clockMode: PropTypes.oneOf([12, 24]).isRequired,
  className: PropTypes.string,
  invalidClass: PropTypes.string
}

export default SimpleTimeInput
