import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { UserInterface } from "@/types";

interface AddUserSheetProps {
  onAddUser: (newUser: Omit<UserInterface, 'id'>) => void;
}


export function AddUserSheet({ onAddUser }: AddUserSheetProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    whatsapp: false,
    cpf: "",
    rg: "",
    age: 0,
    gender: "Homem",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const initials = formData.name
      .split(" ")
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .map((name) => name[0])
      .join("")
      .toUpperCase();

    const newUser: Omit<UserInterface, 'id'> = {
      initials,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      date: new Date().toLocaleDateString("pt-BR") + " - " + 
            new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
      sessionTime: "0m00s",
      type: "Usuário padrão",
      status: status ? "Ativo" : "Inativo",
      email: formData.email,
      telefone: formData.telefone,
      whatsapp: formData.whatsapp,
      cpf: formData.cpf,
      rg: formData.rg
    };

    onAddUser(newUser);

    toast.success("Usuário adicionado com sucesso!", {
      action: {
        label: "Fechar",
        onClick: () => {},
      },
    });

    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] p-10 flex flex-col h-full">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-10 top-10 p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Fechar</span>
        </button>

        <SheetHeader className="px-0">
          <SheetTitle>Adicionar usuário</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 flex-1 flex flex-col overflow-y-auto"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="Informe o telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="whatsapp"
              className="accent-black"
              checked={formData.whatsapp}
              onChange={handleChange}
            />
            <Label htmlFor="whatsapp">WhatsApp</Label>
          </div>
          <div className="flex gap-5">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="Informe o CPF"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                placeholder="Informe o RG"
                value={formData.rg}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Status</p>
              <p className="text-sm text-muted-foreground">
                Defina se o usuário estará ativo ao ser adicionado.
              </p>
            </div>
            <Switch checked={status} onCheckedChange={setStatus} />
          </div>

          <div className="flex justify-end gap-2 pt-4 mt-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
