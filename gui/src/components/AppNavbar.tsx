import { Button } from "@ethui/ui/components/shadcn/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useSidebar } from "#/components/shadcn/sidebar";
import { useIsMobile } from "#/hooks/use-mobile";

interface NavbarProps {
  title: React.ReactNode;
}

export function AppNavbar({ title }: NavbarProps) {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header
      data-tauri-drag-region="true"
      className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-10 items-center">
        <Button
          className={clsx(!isMobile && "hidden")}
          variant="ghost"
          onClick={() => sidebar.toggleSidebar()}
        >
          <HamburgerMenuIcon />
        </Button>
        <div className="flex items-center space-x-0 space-x-4 md:mx-4">
          <h1 className="font-bold">{title}</h1>
        </div>
      </div>
    </header>
  );
}