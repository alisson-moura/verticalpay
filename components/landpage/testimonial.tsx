import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Ana Paula",
      role: "Dona de salão de beleza",
      avatar: "https://ui-avatars.com/api/?name=Ana+Paula&background=random",
      content:
        "Com a VerticalPay, minhas vendas cresceram 35% em apenas um mês. Finalmente encontrei uma maquininha que não leva meu lucro embora.",
    },
    {
      name: "Carlos",
      role: "Prestador de serviços",
      avatar: "https://ui-avatars.com/api/?name=Carlos&background=random",
      content:
        "A VerticalPay resolveu meu problema. Agora recebo de qualquer cliente sem pagar caro em taxas.",
    },
    {
      name: "Ricardo Mendes",
      role: "Dono de mercadinho",
      avatar:
        "https://ui-avatars.com/api/?name=Ricardo+Mendes&background=random",
      content:
        "A praticidade da VerticalPay no dia a dia é incrível. O suporte ao cliente também é muito rápido, o que me deixa seguro para focar no que realmente importa: meus clientes.",
    },
  ];

  return (
    <section>
      <div className="bg-muted py-10">
        <div className="@container mx-auto w-full max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-foreground text-4xl font-semibold">
              Histórias reais de quem já vende mais com a VerticalPay
            </h2>
            <p className="text-muted-foreground my-4 text-balance text-lg">
              Veja como empreendedores como você estão transformando seus
              negócios com as soluções de pagamento da VerticalPay.
            </p>
          </div>
          <div className="@lg:grid-cols-2 @3xl:grid-cols-3 grid gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex h-full flex-col">
                <div className="bg-background ring-foreground/10 flex-grow rounded-2xl rounded-bl border border-transparent px-4 py-3 ring-1">
                  <p className="text-foreground">{testimonial.content}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="ring-foreground/10 size-6 border border-transparent shadow ring-1">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-foreground text-sm font-medium">
                    {testimonial.name}
                  </div>
                  <span
                    aria-hidden
                    className="bg-foreground/25 size-1 rounded-full"
                  ></span>
                  <span className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
