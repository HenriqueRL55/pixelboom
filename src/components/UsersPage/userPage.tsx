import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Search,
  User,
  Calendar,
  Clock,
  Tag,
  ListFilter,
} from "lucide-react";
import { AddUserSheet } from "@/components/AddUser/addUser";
import { useState } from "react";

interface User {
  initials: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  sessionTime: string;
  type: string;
  status: string;
}

const initialUsers = [
  {
    initials: "JG",
    name: "José Ricardo Gomes",
    age: 51,
    gender: "Homem",
    date: "22/03/2025 - 10:21am",
    sessionTime: "38m22s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "HS",
    name: "Helena Soares",
    age: 46,
    gender: "Mulher",
    date: "22/03/2025 - 10:21am",
    sessionTime: "38m22s",
    type: "Usuário padrão",
    status: "Inativo",
  },

  {
    initials: "MC",
    name: "Maria da Conceição",
    age: 32,
    gender: "Mulher",
    date: "21/03/2025 - 09:15am",
    sessionTime: "45m10s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "PA",
    name: "Pedro Almeida",
    age: 28,
    gender: "Homem",
    date: "20/03/2025 - 02:30pm",
    sessionTime: "25m45s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "RA",
    name: "Ricardo Andrade",
    age: 40,
    gender: "Homem",
    date: "19/03/2025 - 11:45am",
    sessionTime: "50m00s",
    type: "Usuário padrão",
    status: "Inativo",
  },
  {
    initials: "FS",
    name: "Fernanda Silva",
    age: 35,
    gender: "Mulher",
    date: "18/03/2025 - 04:20pm",
    sessionTime: "30m15s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "LC",
    name: "Luiz Costa",
    age: 29,
    gender: "Homem",
    date: "17/03/2025 - 10:00am",
    sessionTime: "42m30s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "AM",
    name: "Ana Maria",
    age: 45,
    gender: "Mulher",
    date: "16/03/2025 - 03:15pm",
    sessionTime: "28m45s",
    type: "Usuário padrão",
    status: "Inativo",
  },
  {
    initials: "JP",
    name: "João Pereira",
    age: 38,
    gender: "Homem",
    date: "15/03/2025 - 01:30pm",
    sessionTime: "35m20s",
    type: "Usuário padrão",
    status: "Ativo",
  },
  {
    initials: "CS",
    name: "Carla Souza",
    age: 31,
    gender: "Mulher",
    date: "14/03/2025 - 09:45am",
    sessionTime: "47m10s",
    type: "Usuário padrão",
    status: "Ativo",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular páginas
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Gerar números de página para exibição
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

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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

      {/* Campo de busca com ícone de filtro */}
      <div className="flex gap-2 items-center w-full">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <Input
            placeholder="Buscar..."
            className="pl-10 "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Botão de filtro */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => {
            /* função de filtro */
          }}
        >
          <ListFilter className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      {/* Lista de usuários */}
      <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
        {currentUsers.map((user, index) => (
          <Card key={index}>
            <CardContent className="p-1.5 flex items-center justify-between">
              <div className="flex pl-5 gap-4 items-center">
                <div className="bg-muted rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                  {user.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
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
                <Badge
                  variant={user.status === "Ativo" ? "default" : "secondary"}
                >
                  {user.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
        <div>
          {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems}{" "}
          itens
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
