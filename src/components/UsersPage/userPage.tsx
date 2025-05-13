import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User as UserIcon,
  Calendar,
  Clock,
  Tag,
  ListFilter,
  Trash2,
} from "lucide-react";
import { AddUserSheet } from "@/components/AddUser/addUser";
import { EditUserSheet } from "@/components/EditUser/editUser";
import { useState } from "react";
import { toast } from "sonner";
import type { UserInterface } from "@/types";

const initialUsers: UserInterface[] = [
  {
    id: "1",
    initials: "JG",
    name: "José Ricardo Gomes",
    age: 51,
    gender: "Homem",
    date: "22/03/2025 - 10:21am",
    sessionTime: "38m22s",
    type: "Usuário padrão",
    status: "Ativo",
    email: "jose.gomes@example.com",
    telefone: "(11) 99999-9999",
    whatsapp: true,
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
  },
  {
    id: "2",
    initials: "HS",
    name: "Helena Soares",
    age: 46,
    gender: "Mulher",
    date: "22/03/2025 - 10:21am",
    sessionTime: "38m22s",
    type: "Usuário padrão",
    status: "Inativo",
    email: "helena.soares@example.com",
    telefone: "(11) 98888-8888",
    whatsapp: false,
    cpf: "987.654.321-00",
    rg: "98.765.432-1",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserInterface[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddUser = (newUser: Omit<UserInterface, "id">) => {
    const userWithId: UserInterface = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers([...users, userWithId]);
  };

  const handleEditUser = (updatedUser: UserInterface) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId: string) => {
    const confirmDelete = () => {
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Usuário excluído com sucesso!", {
        icon: null,
        style: {
          width: "364px",
          height: "88px",
          borderRadius: "8px",
          padding: "12px 16px",
          gap: "16px",
          border: "1px solid #E4E4E7",
          background: "#FFFFFF",
          boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
          fontFamily: "var(--font-sans)",
          fontWeight: "normal",
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "-0.4px",
          color: "#18181B"
        },
        actionButtonStyle: {
          width: "76px",
          height: "40px",
          borderRadius: "9999px",
          padding: "8px 16px",
          gap: "8px",
          border: "1px solid #E4E4E7",
          background: "#FFFFFF",
          fontFamily: "var(--font-sans)",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "20px",
          letterSpacing: "-0.4px",
          color: "#18181B"
        }
      });
    };
  
    toast.custom((t) => (
      <div 
        className="bg-white rounded-md p-6 border border-[#E4E4E7] w-[364px]"
        style={{
          boxShadow: "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)"
        }}
      >
        <div className="flex flex-col space-y-4">
          <p className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B]">
            Confirmar exclusão
          </p>
          <p className="font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]">
            Tem certeza que deseja excluir este usuário?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t)}
              className="h-10 rounded-full gap-2 py-2 px-4 border border-[#E4E4E7]"
              style={{
                width: "89px",
                fontFamily: "var(--font-sans)",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.4px",
                color: "#18181B"
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                confirmDelete();
                toast.dismiss(t);
              }}
              className="h-10 rounded-full gap-2 py-2 px-4"
              style={{
                width: "89px",
                fontFamily: "var(--font-sans)",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.4px"
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currentPage - half;
      let end = currentPage + half;

      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="p-[2.5rem] space-y-[1.25rem]">
      <div className="flex justify-between items-center">
        <h1 className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
          Usuários
        </h1>
        <AddUserSheet onAddUser={handleAddUser} />
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.25rem]">
        <Card className="bg-[#FAFAFA] rounded-lg">
          <CardContent className="p-[1.5rem] flex flex-col gap-[0.5rem]">
            <p className="font-sans font-normal text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
              Usuários
            </p>
            <p className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
              {users.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#FAFAFA] rounded-lg">
          <CardContent className="p-[1.5rem] flex flex-col gap-[0.5rem]">
            <p className="font-sans font-normal text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
              Tempo de sessão
            </p>
            <p className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
              31m 20s
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#FAFAFA] rounded-lg">
          <CardContent className="p-[1.5rem] flex flex-col gap-[0.5rem]">
            <p className="font-sans font-normal text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
              Ativos
            </p>
            <p className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
              {users.filter((u) => u.status === "Ativo").length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#FAFAFA] rounded-lg">
          <CardContent className="p-[1.5rem] flex flex-col gap-[0.5rem]">
            <p className="font-sans font-normal text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
              Inativos
            </p>
            <p className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
              {users.filter((u) => u.status === "Inativo").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e filtros */}
      <div className="flex gap-[0.5rem] items-center w-full mt-[1.25rem] mb-[1.25rem]">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-[0.75rem] pointer-events-none">
            <Search className="w-[1rem] h-[1rem] text-[#71717A]" />
          </div>
          <Input
            placeholder="Buscar..."
            className="pl-[2.5rem] font-sans font-normal text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] text-[#71717A]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-[2.5rem] w-[2.5rem] p-[0.5rem] border border-[#E4E4E7] bg-white"
        >
          <ListFilter className="w-[1rem] h-[1rem] text-[#18181B]" />
        </Button>
      </div>

      {/* Lista de usuários */}
      <div className="space-y-[0.5rem] overflow-y-auto max-h-[25rem] pr-[0.5rem]">
        {currentUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-[0.375rem] flex items-center justify-between">
              <div className="flex pl-[1.25rem] gap-[1rem] items-center">
                {/* Círculo com iniciais */}
                <div className="bg-[#F4F4F5] rounded-full h-[3.5rem] w-[3.5rem] flex items-center justify-center font-sans font-medium text-[1rem] leading-[1] tracking-[-0.025em] text-[#102822]">
                  {user.initials}
                </div>

                <div className="flex flex-col gap-[0.5rem]">
                  {" "}
                  {/* Adicionado gap vertical de 8px */}
                  {/* Nome do usuário */}
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
                  {/* Informações adicionais */}
                  <div className="flex items-center text-[0.75rem] leading-[1] tracking-[-0.025em] text-[#71717A]">
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

              {/* Ações */}
              <div className="flex gap-[0.5rem] items-center">
                <Badge
                  variant={user.status === "Ativo" ? "default" : "secondary"}
                >
                  {user.status}
                </Badge>
                <EditUserSheet user={user} onEditUser={handleEditUser} />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-[1rem] h-[1rem]" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center pt-[1rem] text-sm text-muted-foreground">
        <div>
          {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems}{" "}
          itens
        </div>
        <div className="flex items-center gap-[0.5rem]">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </Button>
          <div className="flex gap-[0.25rem]">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <Button
                  key={index}
                  size="sm"
                  variant={currentPage === page ? "outline" : "ghost"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-[0.5rem] flex items-center">
                  ...
                </span>
              )
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
          </Button>
        </div>
        <div className="flex items-center gap-[0.25rem]">
          <span>Itens por página</span>
          <select
            className="border rounded px-[0.5rem] py-[0.25rem] text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
