"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Smartphone, Zap, Shield } from "lucide-react";
import Image from "next/image";

interface Machine {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  description: string;
  features: string[];
  highlight: boolean;
}

interface MachinePricingProps {
  machines: Machine[];
}

export function MachinePricing({ machines }: MachinePricingProps) {
  return (
    <section id="maquinas" className="py-14 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Escolha a maquininha perfeita para o seu negócio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossas máquinas com preços especiais e as menores taxas do mercado.
            Escolha a que melhor se adapta ao seu tipo de negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mx-auto">
          {machines.map((machine) => (
            <Card
              key={machine.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${machine.highlight
                  ? "border-primary shadow-lg scale-105"
                  : "border-gray-200 hover:border-primary/50"
                }`}
            >
              {machine.badge && (
                <Badge
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 ${machine.highlight
                      ? "bg-primary text-white"
                      : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  {machine.badge}
                </Badge>
              )}

              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Image
                    src={machine.image || "/placeholder.svg"}
                    alt={machine.name}
                    width={200}
                    height={300}
                    className="w-full h-48 object-contain mx-auto"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2">{machine.name}</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {machine.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {machine.price}
                    </span>
                    {machine.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {machine.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Parcelamento disponível • Frete grátis
                  </p>
                </div>

                <div className="space-y-3 mb-8 text-left">
                  {machine.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Entrega grátis em todo o Brasil
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-muted/50 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-medium">Segurança garantida</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-medium">Ativação no mesmo dia</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Smartphone className="w-6 h-6 text-primary" />
                <span className="font-medium">Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
