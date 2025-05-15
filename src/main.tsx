import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate } from 'react-router'
import HeroesList from './components/HeroesList.tsx'
import { RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'
import CostList from './components/CostList.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, //<App /> is the parent. There is an outlet in the app. The outlet is where the children get
    children: [

      {index: true, element: <Navigate replace to='/dashboard' />},
      {path: '/dashboard', element: <Dashboard />},
      {path: '/heroes', element: <HeroesList />},
      {path: '/costs', element: <CostList />}

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)