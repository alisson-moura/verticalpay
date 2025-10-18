"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Componentes UI do shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMobile } from "@/hooks/use-mobile";
import { PhoneInput } from "../ui/phone-input";

interface SupportModalProps {
  children: React.ReactNode;
}

// Schema de validação para o formulário de suporte
const formSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  telefone: z.string().min(10, { message: "O telefone parece curto demais." }),
  mensagem: z
    .string()
    .min(10, { message: "A mensagem precisa ter no mínimo 10 caracteres." }),
});

export function SupportModal({ children }: SupportModalProps) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);

  // Estados para controlar o envio e a resposta da API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  // Função de submit assíncrona para chamar a API de suporte
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Ocorreu um erro ao enviar sua mensagem."
        );
      }

      setSubmissionStatus("success");
      form.reset();
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ocorreu um erro inesperado."
      );
      console.error("Falha no envio do formulário de suporte:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Função para lidar com a abertura/fechamento do modal e resetar o estado
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setSubmissionStatus("idle");
        setErrorMessage("");
        form.reset();
      }, 300); // Aguarda a animação de fechar
    }
  };

  // Componente interno para o conteúdo do formulário
  const FormContent = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PhoneInput
                  id="phone"
                  type="tel"
                  required
                  defaultCountry="BR"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como podemos ajudar?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva sua dúvida ou problema..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submissionStatus === "error" && (
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="flex-1 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </form>
    </Form>
  );

  // Componente para a mensagem de sucesso
  const SuccessContent = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-xl font-semibold">Mensagem enviada!</h3>
      <p className="text-sm text-gray-500">
        Recebemos sua solicitação. Nossa equipe de suporte entrará em contato em
        breve.
      </p>
      <Button onClick={() => handleOpenChange(false)} className="mt-4">
        Fechar
      </Button>
    </div>
  );

  const Content =
    submissionStatus === "success" ? <SuccessContent /> : <FormContent />;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto p-4">
          <SheetHeader className="pb-6 text-left">
            <SheetTitle>Fale com nosso suporte</SheetTitle>
          </SheetHeader>
          {Content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Fale com nosso suporte</DialogTitle>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
}
