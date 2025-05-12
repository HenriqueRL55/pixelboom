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
    rg: "12.345.678-9"
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
    rg: "98.765.432-1"
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserInterface[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddUser = (newUser: Omit<UserInterface, 'id'>) => {
    const userWithId: UserInterface = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers([...users, userWithId]);
  };

  const handleEditUser = (updatedUser: UserInterface) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    const confirmDelete = () => {
      setUsers(users.filter(user => user.id !== userId));

      toast.success("Usuário excluído com sucesso!", {
        icon: null,
        action: {
          label: "Fechar",
          onClick: () => {},
        },
      });
    };

    toast.custom((t) => (
      <div className="bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex flex-col space-y-4">
          <p className="font-medium">Confirmar exclusão</p>
          <p>Tem certeza que deseja excluir este usuário?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t)}
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

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <AddUserSheet onAddUser={handleAddUser} />
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Usuários</p>
            <p className="text-2xl font-semibold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tempo de sessão</p>
            <p className="text-2xl font-semibold">31m 20s</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ativos</p>
            <p className="text-2xl font-semibold">
              {users.filter((u) => u.status === "Ativo").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Inativos</p>
            <p className="text-2xl font-semibold">
              {users.filter((u) => u.status === "Inativo").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Busca e filtros */}
      <div className="flex gap-2 items-center w-full">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <Input
            placeholder="Buscar..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <ListFilter className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Lista de usuários */}
      <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
        {currentUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-1.5 flex items-center justify-between">
              <div className="flex pl-5 gap-4 items-center">
                <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                  {user.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <UserIcon className="w-3 h-3" />
                      <span>
                        {user.age} anos, {user.gender}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <div className="flex items-center gap-1 pl-2 ml-2 first:border-0 first:pl-0 first:ml-0">
                      <Calendar className="w-3 h-3" />
                      <span>{user.date}</span>
                    </div>
                    <div className="flex items-center gap-1 pl-2 ml-2">
                      <Clock className="w-3 h-3" />
                      <span>{user.sessionTime}</span>
                    </div>
                    <div className="flex items-center gap-1 pl-2 ml-2">
                      <Tag className="w-3 h-3" />
                      <span>{user.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
                <EditUserSheet 
                  user={user} 
                  onEditUser={handleEditUser} 
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
        <div>
          {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} itens
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </Button>
          <div className="flex gap-1">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <Button
                  key={index}
                  size="sm"
                  variant={currentPage === page ? "outline" : "ghost"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2 flex items-center">
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
        <div className="flex items-center gap-1">
          <span>Itens por página</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
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