import {
  TrendingDown,
  Zap,
  Shield,
  Headset,
  Rocket,
  Users,
} from "lucide-react";
import React from "react";

interface Reason {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature43Props {
  heading?: string;
  subheading?: string;
  reasons?: Reason[];
}

// Array de benefícios atualizado, sem emojis nos títulos.
const defaultReasons: Reason[] = [
  {
    title: "Taxas Reais e sem Pegadinha",
    description:
      "Faça suas vendas sem ter surpresas com mudanças de taxas repentinas.",
    icon: <TrendingDown className="size-8 text-primary" />,
  },
  {
    title: "Ativação rápida",
    description:
      "Maquinas Prontas para uso em até um dia útil após aprovação do credenciamento.",
    icon: <Zap className="size-8 text-primary" />,
  },
  {
    title: "Segurança total",
    description:
      "Tecnologia confiável para você e seus clientes. Transações 100% seguras.",
    icon: <Shield className="size-8 text-primary" />,
  },
  {
    title: "Suporte humano e dedicado",
    description:
      "Atendimento rápido, sem robôs. Nossa equipe está sempre pronta para ajudar.",
    icon: <Headset className="size-8 text-primary" />,
  },
  {
    title: "Vendas sem limites",
    description:
      "Aceite cartões de débito, crédito e parcelamento sem complicação.",
    icon: <Rocket className="size-8 text-primary" />,
  },
  {
    title: "Para todo tipo de negócio",
    description:
      "Soluções personalizadas para varejistas e prestadores de serviços.",
    icon: <Users className="size-8 text-primary" />,
  },
];

export const Benefits = ({
  heading = "✅ Por que a VerticalPay é diferente?",
  subheading = "Descubra os benefícios que fazem da VerticalPay a escolha certa para o seu negócio",
  reasons = defaultReasons,
}: Feature43Props) => {
  return (
    <section id="vantagens" className="py-14 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subheading}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col text-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                {reason.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
