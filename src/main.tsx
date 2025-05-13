// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import DashboardPage from './Pages/DashboardPage/dashboardPage.tsx'
import UsersPage from './Pages/UsersPage/userPage.tsx'
import DocumentsPage from './Pages/DocumentsPage/documentsPage.tsx'
import SettingsPage from './Pages/SettingsPage/settingsPage.tsx'
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
