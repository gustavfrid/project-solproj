import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Start } from './components/Start'
import { NotFound } from './components/NotFound'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
