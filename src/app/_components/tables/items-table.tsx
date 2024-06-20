'use client';

import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { ItemEntity } from '~/server/db/schema';
import { createItem, deleteItemById } from '~/lib/actions';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	categoryId: z.number(),
});

export function ItemsTable({
	items,
	offset
}: {
	items: ItemEntity[];
	offset: number | null;
}) {
	const [addModalOpen, setAddModalOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			categoryId: 1,
		},
	})

	const router = useRouter();

	function onClick() {
		router.replace(`/?offset=${offset}`);
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await createItem(values.name, values.categoryId);
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
													<FormLabel>Category item</FormLabel>
													<FormControl>
														<Input placeholder="toys" {...field} />
													</FormControl>
													<FormDescription>
														This is name of a item.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="categoryId"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Category id</FormLabel>
													<FormControl>
														<Input placeholder="1" type="number"
															{...field}
															{...form.register('categoryId', {
																valueAsNumber: true
															})}
														/>
													</FormControl>
													<FormDescription>
														This is id of category.
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
						{items.map((item) => (
							<ItemRow key={item.id} item={item} />
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

function ItemRow({ item }: { item: ItemEntity }) {
	const userId = item.id;
	const deleteItemWithId = deleteItemById.bind(null, userId);

	return (
		<TableRow>
			<TableCell className="font-medium">{item.id}</TableCell>
			<TableCell className="hidden md:table-cell">{item.name}</TableCell>
			<TableCell>{item.createdAt.toDateString()}</TableCell>
			<TableCell>
				<Button
					className="w-full"
					size="sm"
					variant="outline"
					formAction={deleteItemWithId}
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
}
