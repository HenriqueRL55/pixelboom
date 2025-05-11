import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Search, User, Calendar, Clock, Tag } from "lucide-react";
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
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
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
            <p className="text-2xl font-semibold">294</p>
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
            <p className="text-2xl font-semibold">203</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Inativos</p>
            <p className="text-2xl font-semibold">127</p>
          </CardContent>
        </Card>
      </div>

      {/* Campo de busca */}
      <div className="flex gap-2 items-center">
        <Input placeholder="Buscar..." className="max-w-md" />
        <Button variant="outline" size="icon">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Lista de usuários */}
    {/* Lista de usuários */}
    <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
        {users.map((user, index) => (
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
        <div>5 de 294 itens</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Anterior
          </Button>
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              1
            </Button>
            <Button size="sm" variant="ghost">
              2
            </Button>
            <span className="px-1">...</span>
            <Button size="sm" variant="ghost">
              58
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            Próxima
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <span>Itens por página</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
