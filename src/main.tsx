// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import DashboardPage from './components/DashboardPage/dashboardPage.tsx'
import UsersPage from './components/UsersPage/userPage.tsx'
import DocumentsPage from './components/DocumentsPage/documentsPage.tsx'
import SettingsPage from './components/SettingsPage/settingsPage.tsx'
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/usuarios" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'usuarios',
        element: <UsersPage />,
      },
      {
        path: 'documentos',
        element: <DocumentsPage />,
      },
      {
        path: 'configuracoes',
        element: <SettingsPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
