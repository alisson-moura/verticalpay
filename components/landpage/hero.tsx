import Image from "next/image";
import { Phone } from "lucide-react";
import { RainbowButton } from "../magicui/rainbow-button";

export function Hero() {
  return (
    <section className="flex items-center py-8 sm:py-12 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-balance leading-tight">
              <span className="text-foreground">Venda Mais com a </span>
              <span className="text-primary">VerticalPay</span>
              <span className="text-foreground">: Maquininhas com as </span>
              <span className="text-primary">Menores Taxas</span>
              <span className="text-foreground"> do Mercado!</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A solução perfeita para varejistas e prestadores de serviços que
              querem lucrar mais, com máquinas seguras, fáceis de usar e taxas
              que cabem no seu bolso.
            </p>
            <RainbowButton size="lg" className="w-full">
              <Phone className="h-4 w-4 mr-4" />
              Converse com um de nossos Vendedores
            </RainbowButton>
          </div>

          {/* Imagem */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/maquinas.png"
              alt="Maquininhas VerticalPay"
              width={600}
              height={500}
              priority
              className="w-full max-w-xs sm:max-w-md lg:max-w-full h-auto rounded-2xl object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
