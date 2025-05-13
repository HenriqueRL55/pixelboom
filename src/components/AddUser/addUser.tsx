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
  onAddUser: (newUser: Omit<UserInterface, "id">) => void;
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

    const newUser: Omit<UserInterface, "id"> = {
      initials,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      date:
        new Date().toLocaleDateString("pt-BR") +
        " - " +
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
      rg: formData.rg,
    };

    onAddUser(newUser);

    toast.success("Usuário adicionado com sucesso!", {
      action: {
        label: "Fechar",
        onClick: () => {},
      },
      icon: null,
      style: {
        width: "364px",
        height: "88px",
        borderRadius: "8px",
        padding: "12px 16px",
        gap: "16px",
        border: "1px solid #E4E4E7",
        background: "#FFFFFF",
        boxShadow:
          "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        fontFamily: "var(--font-sans)",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "-0.4px",
        color: "#18181B",
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
        color: "#18181B",
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
        <Button
          variant="default"
          className="h-10 w-[7.3125rem] rounded-full gap-[0.5rem] py-[0.5rem] px-[1rem] bg-[#102822] hover:bg-[#102822]/90"
        >
          <Plus className="w-4 h-4 text-[#FAFAFA]" />
          <span className="font-sans font-medium text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] text-[#FAFAFA]">
            Adicionar
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[800px] p-10 flex flex-col h-full">
        <SheetHeader className="px-0 flex items-start h-10">
          <SheetTitle className="font-serif font-normal text-2xl leading-[1.5] tracking-tighter text-[#18181B] text-left w-full">
            Adicionar usuário
          </SheetTitle>
          <div className="absolute right-10 top-14 flex items-center h-10">
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full border border-[#E4E4E7] hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-[#18181B]" />
              <span className="sr-only">Fechar</span>
            </button>
          </div>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex-1 flex flex-col overflow-y-auto"
        >
          <div className="mb-5 w-full">
            <Label
              htmlFor="name"
              className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B] mb-2"
            >
              Nome completo
            </Label>
            <Input
              id="name"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-10 rounded-md py-2 px-3 gap-1 opacity-50 border border-[#E4E4E7] font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]"
            />
          </div>

          <div className="mb-5 w-full">
            <Label
              htmlFor="email"
              className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B] mb-2"
            >
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o e-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-10 rounded-md py-2 px-3 gap-1 opacity-50 border border-[#E4E4E7] font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]"
            />
          </div>

          <div className="mb-5 w-full">
            <Label
              htmlFor="telefone"
              className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B] mb-2"
            >
              Telefone
            </Label>
            <Input
              id="telefone"
              placeholder="Informe o telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full h-10 rounded-md py-2 px-3 gap-1 opacity-50 border border-[#E4E4E7] font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]"
            />
          </div>

          <div className="flex items-center space-x-2 mb-5">
            {" "}
            {/* Adicionado mb-5 (20px) */}
            <input
              type="checkbox"
              id="whatsapp"
              className="accent-black"
              checked={formData.whatsapp}
              onChange={handleChange}
            />
            <Label
              htmlFor="whatsapp"
              className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B]"
            >
              WhatsApp
            </Label>
          </div>
          <div className="flex gap-4 mb-5">
            {" "}
            {/* gap-4 (16px) já estava correto, adicionado mb-5 (20px) */}
            <div className="flex-1">
              <Label
                htmlFor="cpf"
                className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B] mb-2"
              >
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="Informe o CPF"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full h-10 rounded-md py-2 px-3 gap-1 opacity-50 border border-[#E4E4E7] font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]"
              />
            </div>
            <div className="flex-1">
              <Label
                htmlFor="rg"
                className="font-sans font-medium text-sm leading-[100%] tracking-[-0.4px] text-[#18181B] mb-2"
              >
                RG
              </Label>
              <Input
                id="rg"
                placeholder="Informe o RG"
                value={formData.rg}
                onChange={handleChange}
                className="w-full h-10 rounded-md py-2 px-3 gap-1 opacity-50 border border-[#E4E4E7] font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#71717A]"
              />
            </div>
          </div>

          <div className="w-full h-[66px] flex items-center justify-between rounded-md border border-[#E4E4E7] p-4 gap-4 bg-[#FAFAFA] mb-5">
            <div className="space-y-1">
              <p className="text-sm font-sans font-medium leading-[100%] tracking-[-0.4px] text-[#09090B]">
                Status
              </p>
              <p className="text-xs font-sans font-normal leading-[100%] tracking-[-0.4px] text-[#71717A]">
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
              className="h-10 w-[89px] rounded-full gap-2 py-2 px-4 border border-[#E4E4E7] bg-white hover:bg-gray-50"
            >
              <span className="font-sans font-medium text-sm leading-5 tracking-[-0.4px] text-[#18181B]">
                Cancelar
              </span>
            </Button>
            <Button
              type="submit"
              className="h-10 w-[93px] rounded-full gap-2 py-2 px-4 bg-[#102822] hover:bg-[#102822]/90"
            >
              <span className="font-sans font-medium text-sm leading-5 tracking-[-0.4px] text-[#FAFAFA]">
                Adicionar
              </span>
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
