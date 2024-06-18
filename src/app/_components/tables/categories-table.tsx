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
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { CategoryEntity } from '~/server/db/schema';
import { deleteCategoryById } from '~/lib/actions';

export function CategoriesTable({
	categories,
	offset
}: {
	categories: CategoryEntity[];
	offset: number | null;
}) {
	const router = useRouter();

	function onClick() {
		router.replace(`/?offset=${offset}`);
	}

	return (
		<>
			<div className="flex justify-end my-2">
				<Dialog>
					<DialogTrigger>
						<Button>+</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add new category</DialogTitle>
							<DialogDescription>
								<form>
									<input type="text" name="name" placeholder="Category name" />
									<Button type="submit">Create</Button>
								</form>
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