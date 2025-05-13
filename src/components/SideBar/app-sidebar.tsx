import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  ChevronsUpDown,
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
import { HeadphonesIcon, DashboardIcon } from "@/assets/icons";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: DashboardIcon,
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

const settingsItems = [
  {
    title: "Geral",
    url: "/configuracoes",
    icon: Settings,
  },
];

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
          <div className="flex items-center justify-between p-[1.45rem]">
            <Button
              size="default"
              variant="default"
              className="flex items-center justify-center bg-black rounded-[0.5rem] w-[6rem] h-[2rem] p-0"
            >
              <span className="text-white font-inter font-bold text-[0.75rem] leading-[1] tracking-[-0.02em]">
                Logo
              </span>
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-[1rem]">
            <div className="flex items-center gap-[0.5rem]">
              <div className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#F4F4F5] dark:bg-gray-800 rounded-[0.5rem]">
                <span className="font-sans font-semibold text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#102822]">
                  {userInitials}
                </span>
              </div>
              <span className="font-medium font-sans text-[1rem]">
                {userName}
              </span>
            </div>
            <ChevronsUpDown className="w-[1rem] h-[1rem] text-[#71717A]" />{" "}
          </div>
        </div>

        <SidebarGroup className="p-[1rem]">
          <SidebarGroupLabel className="w-[12rem] h-[1rem] font-sans font-normal text-[0.75rem] leading-[1rem] tracking-[-0.025em] text-[#3F3F46] mb-[0.375rem]">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-[0.375rem]">
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "w-[13rem] h-[2.5rem]" : "w-full"}
                    >
                      <Link
                        to={item.url}
                        className={`flex items-center no-underline ${
                          isActive
                            ? "bg-[#102822] rounded-full gap-[0.375rem] py-[0.5rem] px-[0.75rem]"
                            : "bg-transparent gap-[0.375rem] px-[1rem] py-[0.5rem]"
                        }`}
                      >
                        <item.icon
                          className={`w-[1.25rem] h-[1.25rem] ${
                            isActive ? "text-[#F4F4F5]" : "text-[#71717A]"
                          }`}
                        />
                        <span
                          className={`font-sans font-medium text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] ${
                            isActive ? "text-[#F4F4F5]" : "text-[#71717A]"
                          }`}
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

        <SidebarGroup className="p-[1rem]">
          <SidebarGroupLabel className="w-[12rem] h-[1rem] font-sans font-normal text-[0.75rem] leading-[1rem] tracking-[-0.025em] text-[#3F3F46] mb-[0.375rem]">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-[0.375rem]">
              {settingsItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "w-[13rem] h-[2.5rem]" : "w-full"}
                    >
                      <Link
                        to={item.url}
                        className={`flex items-center no-underline ${
                          isActive
                            ? "bg-[#102822] rounded-full gap-[0.375rem] py-[0.5rem] px-[0.75rem]"
                            : "bg-transparent gap-[0.375rem] px-[1rem] py-[0.5rem]"
                        }`}
                      >
                        <item.icon
                          className={`w-[1.25rem] h-[1.25rem] ${
                            isActive ? "text-[#F4F4F5]" : "text-[#71717A]"
                          }`}
                        />
                        <span
                          className={`font-sans font-medium text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] ${
                            isActive ? "text-[#F4F4F5]" : "text-[#71717A]"
                          }`}
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

        <div className="absolute bottom-0 left-0 right-0 mx-[1rem] mb-[1rem]">
          <div className="flex items-center justify-between cursor-pointer">
            <span className="font-sans font-normal text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] text-[#102822]">
              Precisa de ajuda?
            </span>
            <HeadphonesIcon className="w-[1rem] h-[1rem] text-[#3F3F46]" />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
