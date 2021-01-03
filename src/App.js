import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Weather from './pages/Weather'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path='/' component={Weather} />
      </div>
    </BrowserRouter>
  )
}

export default App;
