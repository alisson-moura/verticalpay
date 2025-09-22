"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, User } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { name: "Início", href: "#hero" },
  { name: "Vantagens", href: "#vantagens" },
  { name: "Portal Web", href: "#portal-web" },
  { name: "Máquinas", href: "#maquinas" },
  { name: "FAQ", href: "#faq" },
];

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false); // Close mobile menu after navigation
  };

  return (
    <header
      className="border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href={"/"}>
          <Image
            src="/logo.jpeg"
            alt="VerticalPay"
            width={200}
            height={60}
            className="h-12 w-auto"
          />
        </a>

        <div className="hidden lg:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Falar com Vendedor
          </Button>
          <Button variant="outline" className="-ml-6">
            <User className="h-5 w-5" />
            Já sou cliente
          </Button>
        </div>

        <div className="block lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 p-4">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start text-left"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </nav>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Falar com Vendedor
                </Button>
                <Button variant="outline" className="-mt-2">
                  <User className="h-5 w-5" />
                  Já sou cliente
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
