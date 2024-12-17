import { useState } from 'react'

import {Routes, Route} from 'react-router-dom'

import * as pages from './pages/index.js'
import * as components from './components/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.scss'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<><components.Header /><pages.Main /> <components.Footer/> </>} />
        <Route path="/login" element={<><components.Header /><pages.Login /></>} />
        <Route path="/registration" element={<><components.Header /><pages.Registration /></>} />
        <Route path="/profile" element={<><components.Header /><pages.Profile /></>} />
        <Route path="/edit-profile" element={<><components.Header /><pages.Profile /></>} />
        <Route path="/todo" element={<><components.Header /><pages.Todo /></>} />
      </Routes>
    </>
  )
}

export default App
