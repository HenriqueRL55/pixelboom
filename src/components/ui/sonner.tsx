import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            w-[364px] h-[88px]
            bg-white
            rounded-md
            border border-[#E4E4E7]
            shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05),0px_10px_15px_-3px_rgba(0,0,0,0.10)]
            pt-1.5 pr-8 pb-1.5 pl-6
            flex items-center gap-4
            font-sans font-normal text-sm leading-5 tracking-[-0.4px] text-[#18181B]
          `,
          content: "flex-1",
          title: "hidden",
          description: "text-[#18181B]",
          actionButton: `
            w-[76px] h-10
            bg-white
            rounded-full
            border border-[#E4E4E7]
            py-2 px-4
            flex items-center justify-center gap-2
            font-sans font-medium text-sm leading-5 tracking-[-0.4px] text-[#18181B]
          `,
          cancelButton: "hidden",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
