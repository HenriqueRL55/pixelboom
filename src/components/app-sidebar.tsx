import { Calendar, Home, Inbox, Search, Settings, ChevronsUpDown, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Usuários",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Documentos",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Geral",
    url: "#",
    icon: Search,
  },
]

// Settings items
const settingsItems = [
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
    <SidebarContent>
      <div className=" border-gray-200 dark:border-gray-800">
        <div className="border-b flex items-center justify-between p-5">
          <Button size="default" variant="default" className="justify-start gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Logo</span>
            </div>
          </Button>
        </div>
        
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <User className="w-5 h-5" />
            </div>
            <span className="font-medium">Filial A</span>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

        {/* First Group - Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Second Group - Configurações */}
        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}