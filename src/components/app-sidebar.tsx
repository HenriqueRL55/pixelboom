import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Settings,
  ChevronsUpDown,
  Headphones,
  User,
  FileCheck,
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
    icon: User,
  },
  {
    title: "Documentos",
    url: "/documentos",
    icon: FileCheck,
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

// Função para gerar iniciais do nome
const getInitials = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export function AppSidebar() {
  const location = useLocation();
  const userName = "Filial A";
  const userInitials = getInitials(userName);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="border-gray-200 dark:border-gray-800">
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
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full font-medium">
                {userInitials}
              </div>
              <span className="font-medium font-sans">{userName}</span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Grupo: Menu */}
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="font-sans">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-emerald-950 rounded-full"
                          : "bg-transparent"
                      }
                    >
                      <Link to={item.url} className="flex items-center gap-2 px-4 py-2 no-underline">
                        <item.icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500"}`}
                        />
                        <span
                          className={`font-sans font-medium text-sm leading-5 tracking-[-0.4px] ${isActive ? "text-white" : "text-zinc-500"}`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

            

        {/* Grupo: Configurações */}
        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="font-sans">Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-emerald-950 rounded-full"
                          : "bg-transparent"
                      }
                    >
                      <Link to={item.url} className="flex items-center gap-2 px-4 py-2 no-underline">
                        <item.icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500"}`}
                        />
                        <span
                          className={`font-sans font-medium text-sm leading-5 tracking-[-0.4px] ${isActive ? "text-white" : "text-zinc-500"}`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Rodapé: Ajuda */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between text-sm text-zinc-500 cursor-pointer">
            <span>Precisa de ajuda?</span>
            <Headphones className="w-4 h-4" />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
