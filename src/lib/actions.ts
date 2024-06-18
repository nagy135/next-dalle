'use server';

import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function deleteItemById(itemId: number) {
	await api.item.deleteById(itemId);
	revalidatePath('/');
}

export async function deleteCategoryById(categoryId: number) {
	await api.category.deleteById(categoryId);
	revalidatePath('/');
}

export async function createCategory(name: string, parentId?: number) {
	await api.category.create({ name, parentId });
	revalidatePath('/');
}
