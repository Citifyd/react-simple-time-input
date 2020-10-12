'use strict'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SimpleTimeInput from '../components/SimpleTimeInput'

function App () {
  const [time, setTime] = useState('')
  const [clockMode, setClockMode] = useState(12)

  return (
    <>
      <Header />

      <label htmlFor='time' className='time-label'>
        Type the time in and blur:
      </label>
      <SimpleTimeInput
        value={time}
        onValueChange={setTime}
        clockMode={clockMode}
        className='time-input'
        id='time'
      />
      <code>time = {JSON.stringify(time)}</code>

      <ClockModeSelector clockMode={clockMode} setClockMode={setClockMode} />

      <Footer />
    </>
  )
}

function ClockModeSelector ({ clockMode, setClockMode }) {
  return (
    <div className='mode-selection'>
      <h4>Clock mode</h4>
      <label>
        <input
          type='radio'
          onChange={e => setClockMode(Number(e.target.value))}
          checked={clockMode === 12}
          value='12'
        />
        {' '}
        12 hour
      </label>
      <label>
        <input
          type='radio'
          onChange={e => setClockMode(Number(e.target.value))}
          checked={clockMode === 24}
          value='24'
        />
        {' '}
        24 hour
      </label>
    </div>
  )
}

function Header () {
  return (
    <h1>
      <span>React Simple</span> <span>Time Input</span>
    </h1>
  )
}

function Footer () {
  return (
    <footer>
      <p>
        <a
          href='https://github.com/citifyd/react-simple-time-input'
          target='_blank'
          rel='noopener noreferrer'
        >
          View on GitHub
        </a>
      </p>
      <p>
        Made with 🧡 by
        {' '}
        <a
          href='https://www.citifyd.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Citifyd
        </a>
      </p>
    </footer>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
