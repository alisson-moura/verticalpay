import { BarChart3, CreditCard, FileText } from "lucide-react";
import Image from "next/image";

export function PwFeature() {
  return (
    <section id="portal-web" className="py-4 bg-muted scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 items-center lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Acesse pelo computador
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Portal Web: controle total de suas vendas e recebimentos
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Acompanhe suas vendas em tempo real
                  </h3>
                  <p className="text-muted-foreground">
                    Visualize todas as transações, valores vendidos e a
                    performance do seu negócio em um só lugar.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Controle total dos seus recebimentos
                  </h3>
                  <p className="text-muted-foreground">
                    Monitore quando e quanto você vai receber e gerencie seu
                    fluxo de caixa com facilidade.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1 flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Relatórios completos e detalhados
                  </h3>
                  <p className="text-muted-foreground">
                    Gere relatórios para tomar decisões estratégicas baseadas em
                    dados precisos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Imagem - Agora oculta no mobile */}
          <div className="relative lg:col-span-2 hidden lg:block">
            <Image
              src="/dash.jpg"
              alt="Dashboard do Portal Web VerticalPay"
              width={500}
              height={333}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
