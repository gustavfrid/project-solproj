import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Start } from './components/Start'
import { Auth } from './components/Auth'
import { NotFound } from './components/NotFound'
import { LeafletMap } from './components/LeafletMap'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/project' element={<LeafletMap />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
