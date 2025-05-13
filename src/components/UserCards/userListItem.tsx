import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserIcon, Calendar, Clock, Tag } from "lucide-react";
import { EditUserSheet } from "@/components/EditUser/editUser";
import type { UserInterface } from "@/types";

interface UserListItemProps {
  user: UserInterface;
  onEditUser: (user: UserInterface) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserListItem({
  user,
  onEditUser,
}: UserListItemProps) {
  return (
    <Card>
      <CardContent className="p-[0.375rem] flex flex-col sm:flex-row items-center justify-between gap-[1rem]">
        <div className="flex gap-[1rem] items-center sm:w-auto w-full">
          <div className="bg-[#F4F4F5] rounded-full h-[3.5rem] w-[3.5rem] flex items-center justify-center font-sans font-medium text-[1rem] leading-[1] tracking-[-0.025em] text-[#102822]">
            {user.initials}
          </div>

          <div className="flex flex-col gap-[0.5rem] w-full sm:w-auto">
            <div className="flex items-center gap-[0.5rem]">
              <p className="font-sans font-medium text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] text-[#18181B] align-middle">
                {user.name}
              </p>
              <div className="flex items-center gap-[0.25rem] text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
                <UserIcon className="w-[0.75rem] h-[0.75rem] text-[#A1A1AA]" />
                <span className="align-middle">
                  {user.age} anos, {user.gender}
                </span>
              </div>
            </div>
            <div className="flex items-center text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A] flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-[0.25rem] pl-[0.5rem] ml-[0.5rem] first:border-0 first:pl-0 first:ml-0">
                <Calendar className="w-[0.75rem] h-[0.75rem] text-[#A1A1AA]" />
                <span className="align-middle">{user.date}</span>
              </div>
              <div className="flex items-center gap-[0.25rem] pl-[0.5rem] ml-[0.5rem]">
                <Clock className="w-[0.75rem] h-[0.75rem] text-[#A1A1AA]" />
                <span className="align-middle">{user.sessionTime}</span>
              </div>
              <div className="flex items-center gap-[0.25rem] pl-[0.5rem] ml-[0.5rem]">
                <Tag className="w-[0.75rem] h-[0.75rem] text-[#A1A1AA]" />
                <span className="align-middle">{user.type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[0.5rem] items-center mt-2 sm:mt-0">
          <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
            {user.status}
          </Badge>
          <EditUserSheet
            user={user}
            onEditUser={onEditUser}
          />
        </div>
      </CardContent>
    </Card>
  );
}
