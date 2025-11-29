"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePricingData } from "@/app/actions/pricing";
import { Loader2 } from "lucide-react";

export function AdminForm({ initialData }: { initialData: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const { register, control, handleSubmit } = useForm({
        defaultValues: initialData,
    });

    const { fields: taxFields } = useFieldArray({
        control,
        name: "taxes",
    });

    const { fields: machineFields } = useFieldArray({
        control,
        name: "machines",
    });

    const onSubmit = async (data: any) => {
        setIsSaving(true);
        try {
            await updatePricingData(data);
            alert("Salvo com sucesso!");
        } catch {
            alert("Erro ao salvar");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <Card>
                <CardHeader>
                    <CardTitle>Taxas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 font-bold mb-2">
                        <div>Valor</div>
                        <div>Rótulo</div>
                        <div>Cor (Classe Tailwind)</div>
                    </div>
                    {taxFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-3 gap-4">
                            <Input {...register(`taxes.${index}.value`)} />
                            <Input {...register(`taxes.${index}.label`)} />
                            <Input {...register(`taxes.${index}.color`)} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Máquinas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {machineFields.map((field, index) => (
                        <div key={field.id} className="border p-4 rounded-lg space-y-4">
                            <h3 className="font-bold">Máquina {index + 1}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Nome</label>
                                    <Input {...register(`machines.${index}.name`)} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Preço</label>
                                    <Input {...register(`machines.${index}.price`)} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Preço Original</label>
                                    <Input {...register(`machines.${index}.originalPrice`)} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Badge</label>
                                    <Input {...register(`machines.${index}.badge`)} />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm font-medium">Descrição</label>
                                    <Textarea {...register(`machines.${index}.description`)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end container mx-auto">
                <Button type="submit" disabled={isSaving} size="lg">
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                </Button>
            </div>
        </form>
    );
}
