// Definindo os tipos para as props para melhor autocompletar e segurança de tipo
type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  className?: string;
};

export function LogoVerticalPay({
  size = "md",
  variant = "dark",
  className,
}: LogoProps) {
  // Mapeamento de estilos para os tamanhos
  const sizeStyles = {
    sm: {
      heading: "text-2xl",
      tagline: "text-[0.5rem] tracking-[0.2em]",
    },
    md: {
      heading: "text-4xl",
      tagline: "text-xs tracking-[0.3em]",
    },
    lg: {
      heading: "text-6xl",
      tagline: "text-sm tracking-[0.4em]",
    },
  };

  // Mapeamento de estilos para as variantes de cor
  const variantStyles = {
    dark: {
      // Para fundos claros
      vertical: "text-slate-800",
      pay: "text-blue-600",
      tagline: "text-slate-600",
    },
    light: {
      // Para fundos escuros
      vertical: "text-slate-100",
      pay: "text-blue-400",
      tagline: "text-slate-300",
    },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  return (
    <div className={className}>
      <h1 className={`${currentSize.heading} font-bold leading-none`}>
        <span className={currentVariant.vertical}>Vertical</span>
        <span className={currentVariant.pay}>Pay</span>
      </h1>
      <p className={`${currentSize.tagline} ${currentVariant.tagline}`}>
        TECNOLOGIA
      </p>
    </div>
  );
}
