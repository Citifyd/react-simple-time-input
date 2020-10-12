'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { parseInputChange, formatTimeForDisplay } from 'simple-time-input-engine'

function SimpleTimeInput ({
  value,
  onValueChange,
  onBlur,
  onChange,
  clockMode,
  className,
  invalidClassName,
  ...inputProps
}) {
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

    if (!valid) {
      // if user blurs with invalid value, rollback input value to last valid time informed
      refreshInput({ time, clockMode })
    } else if (newTime !== time) {
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

    const { valid } = parseInputChange({ newValue: value, previousTime: time, clockMode })
    setIsInvalid(!valid)

    // forward original event
    if (onChange) {
      onChange(event)
    }
  }, [time, clockMode])

  const classNames = [
    className,
    isInvalid ? invalidClassName : null
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
  invalidClassName: 'invalid-time'
}

SimpleTimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  clockMode: PropTypes.oneOf([12, 24]).isRequired,
  className: PropTypes.string,
  invalidClass: PropTypes.string
}

export default SimpleTimeInput
