"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const password = formData.get("password");

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set("admin_auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        return { success: true };
    } else {
        return { success: false, error: "Senha incorreta" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_auth");
    redirect("/admin/login");
}
