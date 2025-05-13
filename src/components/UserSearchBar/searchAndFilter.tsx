import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ListFilter } from "lucide-react";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchAndFilter({
  searchTerm,
  onSearchChange,
}: SearchAndFilterProps) {
  return (
    <div className="flex gap-[0.5rem] items-center w-full mt-[1.25rem] mb-[1.25rem]">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-[0.75rem] pointer-events-none">
          <Search className="w-[1rem] h-[1rem] text-[#71717A]" />
        </div>
        <Input
          placeholder="Buscar..."
          className="pl-[2.5rem] font-sans font-normal text-[0.875rem] leading-[1.25rem] tracking-[-0.025em] text-[#71717A]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
  );
}
