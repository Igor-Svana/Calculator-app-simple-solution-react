import { useState } from 'react'
import { Theme } from './themes/themes'
import Toggle from './components/toggle/toggle'
import Keyboard from './components/keyboard/keyboard'
import './App.css'

function App() {
  
  const[theme, setTheme] = useState(Theme.dark_blue)
  const [screenNum, setScreenNum] = useState(0)

  const setNumHandler = (value) => {
    setScreenNum(value)
  }

  return (
    <main className="App" style={{background: theme.main_bg, color: theme!==Theme.dark_blue ? theme.dark_text : theme.light_text}}>
      <div className='calc-header'>
        <h2>calc</h2>
        <Toggle setTheme={setTheme} theme={theme}/>
      </div>
      <div className='calc-screen' style={{background: theme.screen_bg, color: theme!==Theme.dark_blue ? theme.dark_text : theme.light_text}}>
        <p className='screen-num'>{screenNum.toString()}</p>
      </div>
      <Keyboard theme={theme} screenNumber={setNumHandler} />
    </main>
  )
}

export default App
