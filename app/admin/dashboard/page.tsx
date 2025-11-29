import { getPricingData } from "@/app/actions/pricing";
import { AdminForm } from "./form";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";

export default async function AdminDashboard() {
    const data = await getPricingData();

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gerenciar Conteúdo</h1>
                <form action={logout}>
                    <Button variant="outline" type="submit">
                        Sair
                    </Button>
                </form>
            </div>
            <AdminForm initialData={data} />
        </div>
    );
}
