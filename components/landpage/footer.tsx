import { LogoVerticalPay } from "./logo";
import { JSX } from "react";

// Um componente auxiliar para os ícones, para não repetir o código
const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: JSX.Element;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-8">
        {/* Seção principal do rodapé */}
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Logo e Slogan */}
          <div>
            <LogoVerticalPay variant="light" size="sm" />
            <p className="text-sm text-gray-300">
              Soluções em pagamento para o seu negócio crescer.
            </p>
          </div>

          {/* Ícones de Redes Sociais */}
          <div className="flex items-center gap-5">
            <SocialIcon href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Divisor e Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} VerticalPay Tecnologia. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
