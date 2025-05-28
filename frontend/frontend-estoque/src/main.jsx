import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Login from './pages/Login'

import { Routes } from './routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
    <Routes />
  </StrictMode>,
)
