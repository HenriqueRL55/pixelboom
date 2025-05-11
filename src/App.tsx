// App.tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Menu from "./components/menu"
import { Toaster } from "sonner"

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Menu />
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
      
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#000',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </SidebarProvider>
  )
}