export function maskCPF(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 11) 
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  
  export function maskRG(value: string): string {
    return value
      .replace(/\D/g, "")
      .slice(0, 9) 
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2");
  }
  