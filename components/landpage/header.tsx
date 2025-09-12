import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header
      className="border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - comum para desktop e mobile */}
        <a href={"/"}>
          <Image
            src="/logo.jpeg"
            alt="VerticalPay"
            width={200}
            height={60}
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Falar com Vendedor
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 p-4">
                {/* O botão aqui dentro também segue o novo estilo */}
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Falar com Vendedor
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
