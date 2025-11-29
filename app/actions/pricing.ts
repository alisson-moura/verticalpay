"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "pricing.json");

export async function getPricingData() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading pricing data:", error);
        return null;
    }
}

export async function updatePricingData(newData: any) {
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData, null, 2), "utf-8");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating pricing data:", error);
        return { success: false, error: "Failed to update data" };
    }
}
