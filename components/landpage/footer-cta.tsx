import { Button } from "../ui/button";

export function FooterCTA() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-6">
          Pronto para lucrar e vender sem preocupação?
        </h2>
        <p className="text-lg text-muted-foreground sm:text-xl mb-8 max-w-3xl mx-auto">
          Junte-se à nós e se preocupe somente em vender e atender seus
          clientes, e a VerticalPay se encarrega de cuidar das suas tecnologias
          de pagamentos.
        </p>
        <Button
          size="lg"
          // Classes para responsividade do botão:
          // h-auto -> Permite que a altura do botão cresça conforme o conteúdo.
          // whitespace-normal -> Permite que o texto quebre em múltiplas linhas.
          // px-6 sm:px-8 -> Padding horizontal responsivo.
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-auto whitespace-normal text-base sm:text-lg px-6 sm:px-8 py-4"
        >
          👉 Quero falar com um vendedor da VerticalPay agora
        </Button>
      </div>
    </section>
  );
}
