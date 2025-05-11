import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Home,
  Inbox,
  Settings,
  ChevronsUpDown,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: Inbox,
  },
  {
    title: "Documentos",
    url: "/documentos",
    icon: Calendar,
  },
];

// Settings items
const settingsItems = [
  {
    title: "Geral",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent>
        <div className="border-gray-200 dark:border-gray-800 ">
          <div className="flex items-center justify-between p-5">
            <Button
              size="default"
              variant="default"
              className="justify-start gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium font-sans">Logo</span>
              </div>
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 ">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <span className="font-medium font-sans">Filial A</span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* First Group - Menu */}
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="font-sans">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="font-sans font-medium text-sm leading-5 tracking-[-0.4px] text-zinc-500">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Second Group - Configurações */}
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="font-sans">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="font-sans font-medium text-sm leading-5 tracking-[-0.4px] text-zinc-500">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
