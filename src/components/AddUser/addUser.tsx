import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

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

interface AddUserSheetProps {
  onAddUser: (newUser: User) => void;
}

export function AddUserSheet({ onAddUser }: AddUserSheetProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefone: '',
    whatsapp: false,
    cpf: '',
    rg: '',
    age: 0,
    gender: 'Homem'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const initials = formData.name.split(' ')
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .map(name => name[0])
      .join('')
      .toUpperCase()

    const newUser: User = {
      initials,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      date: new Date().toLocaleDateString('pt-BR') + ' - ' + 
            new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sessionTime: "0m00s",
      type: "Usuário padrão",
      status: status ? "Ativo" : "Inativo"
    }

    onAddUser(newUser)

    toast.success("Usuário adicionado com sucesso!", {
      icon: null,
      action: {
        label: "Fechar",
        onClick: () => {},
      },
    })

    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent className="w-1/2 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Adicionar usuário</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            <Label htmlFor="age">Idade</Label>
            <Input 
              id="age" 
              type="number" 
              placeholder="Informe a idade" 
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gênero</Label>
            <select
              id="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="Homem">Homem</option>
              <option value="Mulher">Mulher</option>
              <option value="Outro">Outro</option>
            </select>
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
          <div className="flex gap-4">
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

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
