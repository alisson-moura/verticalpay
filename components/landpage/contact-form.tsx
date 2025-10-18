"use client";

import type React from "react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Componentes UI do shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ContactModalProps {
  children: React.ReactNode;
}

// 1. Definição do Schema de Validação com Zod
const formSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  telefone: z.string().min(10, { message: "O telefone parece curto demais." }),
  pais: z.string({ error: "Por favor, selecione um país." }),
  estado: z.string().min(2, { message: "Digite o nome do estado." }),
  cidade: z.string().min(2, { message: "Digite o nome da cidade." }),
});

export function ContactModal({ children }: ContactModalProps) {
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
      estado: "",
      cidade: "",
    },
  });

  // 3. Função de submit assíncrona para chamar a API
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setErrorMessage(""); // Limpa erros anteriores

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Se a resposta da API não for de sucesso, lança um erro
        throw new Error(
          "Ocorreu um erro ao enviar seu contato. Tente novamente."
        );
      }

      // Se a resposta for bem-sucedida
      setSubmissionStatus("success");
      form.reset();
    } catch (error) {
      // Captura erros (de rede ou da API)
      setSubmissionStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ocorreu um erro inesperado."
      );
      console.error("Falha no envio do formulário:", error);
    } finally {
      // Garante que o estado de "carregando" seja desativado
      setIsSubmitting(false);
    }
  }

  // Função para lidar com a abertura/fechamento do modal e resetar o estado
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Adiciona um pequeno delay para a animação de fechamento antes de resetar
      setTimeout(() => {
        setSubmissionStatus("idle");
        setErrorMessage("");
        form.reset();
      }, 300);
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
          name="pais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="brasil">Brasil</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="colombia">Colômbia</SelectItem>
                  <SelectItem value="peru">Peru</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Ex: São Paulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rio de Janeiro" {...field} />
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
      <h3 className="text-xl font-semibold">Contato enviado com sucesso!</h3>
      <p className="text-sm text-gray-500">
        Sua solicitação foi recebida. A Verticalpay entrará em contato em breve.
      </p>
      <Button onClick={() => handleOpenChange(false)} className="mt-4">
        Fechar
      </Button>
    </div>
  );

  // Conteúdo a ser renderizado (formulário ou mensagem de sucesso)
  const Content =
    submissionStatus === "success" ? <SuccessContent /> : <FormContent />;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto p-4">
          <SheetHeader className="pb-6 text-left">
            <SheetTitle>Conversar com nossos vendedores</SheetTitle>
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
          <DialogTitle>Conversar com nossos vendedores</DialogTitle>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
}
