"use client";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance">
                Ficou com dúvida sobre a VerticalPay?
              </h2>
              <p className="text-xl text-muted-foreground">
                Confira nossas perguntas mais frequentes e tire suas dúvidas
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3">
                Tire suas duvidas com o nosso suporte
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-medium">
                  Quais são as taxas da VerticalPay?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Nossas taxas são as mais competitivas do mercado, variando de
                  acordo com o volume de vendas e tipo de transação. Entre em
                  contato para conhecer as condições especiais para seu negócio.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-medium">
                  Como funciona a ativação da maquininha?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A ativação é rápida e simples. Após a contratação, você recebe
                  sua maquininha em casa e pode começar a vender no mesmo dia
                  com nosso suporte de ativação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-medium">
                  O que é o Portal Web VerticalPay?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  É nossa plataforma online onde você pode acompanhar suas
                  vendas, gerar relatórios, gerenciar sua equipe e ter controle
                  total do seu negócio pelo computador.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-background rounded-lg border px-6"
              >
                <AccordionTrigger className="text-left font-medium">
                  Qual o prazo para receber as vendas?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O prazo varia conforme o tipo de transação: débito em 1 dia
                  útil, crédito à vista em 1 dia útil e parcelado conforme as
                  parcelas. Consulte as condições específicas do seu plano.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-6">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Retornar ao topo da página
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
