import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate } from 'react-router'
import HeroesList from './components/HeroesList.tsx'
import { RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'

/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {index: true, element: <Navigate replace to='/dashboard' />},
      {path: '/dashboard', element: <Dashboard />},
      {path: '/heroes', element: <HeroesList />}

    ]
  }
])

*/

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <HeroesList />
  </React.StrictMode>,
)