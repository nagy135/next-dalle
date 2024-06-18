'use client';

import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table
} from '~/components/ui/table';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"

import { Button } from "~/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useRouter } from 'next/navigation';
import { CategoryEntity } from '~/server/db/schema';
import { createCategory, deleteCategoryById } from '~/lib/actions';
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	parentId: z.number().optional(),
})

export function CategoriesTable({
	categories,
	offset
}: {
	categories: CategoryEntity[];
	offset: number | null;
}) {
	const [addModalOpen, setAddModalOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	})
	const router = useRouter();

	function onClick() {
		router.replace(`/?offset=${offset}`);
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await createCategory(values.name, values.parentId);
		setAddModalOpen(false);
	}

	return (
		<>
			<div className="flex justify-end my-2">
				<Dialog open={addModalOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setAddModalOpen(true)}>+</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add new category</DialogTitle>
							<DialogDescription>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Category name</FormLabel>
													<FormControl>
														<Input placeholder="toys" {...field} />
													</FormControl>
													<FormDescription>
														This is name of a category.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type="submit">Submit</Button>
									</form>
								</Form>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<form className="border shadow-sm rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="max-w-[150px]">#</TableHead>
							<TableHead className="hidden md:table-cell">Name</TableHead>
							<TableHead className="hidden md:table-cell">Created at</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.map((category) => (
							<CategoryRow key={category.id} category={category} />
						))}
					</TableBody>
				</Table>
			</form>
			{offset !== null && (
				<Button
					className="mt-4 w-40"
					variant="secondary"
					onClick={() => onClick()}
				>
					Next Page
				</Button>
			)}
		</>
	);
}

function CategoryRow({ category }: { category: CategoryEntity }) {
	const categoryId = category.id;
	const deleteCategoryWithId = deleteCategoryById.bind(null, categoryId);

	return (
		<TableRow>
			<TableCell className="font-medium">{category.id}</TableCell>
			<TableCell className="hidden md:table-cell">{category.name}</TableCell>
			<TableCell>{category.createdAt.toDateString()}</TableCell>
			<TableCell>
				<Button
					className="w-full"
					size="sm"
					variant="outline"
					formAction={deleteCategoryWithId}
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
}
