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
import { CategoryEntity } from '~/server/db/schema';
import { deleteUser } from '~/lib/actions';

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
			<form className="border shadow-sm rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="max-w-[150px]">Name</TableHead>
							<TableHead className="hidden md:table-cell">Email</TableHead>
							<TableHead className="hidden md:table-cell">Username</TableHead>
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
	const deleteUserWithId = deleteUser.bind(null, categoryId);

	return (
		<TableRow>
			<TableCell className="font-medium">{category.name}</TableCell>
			<TableCell className="hidden md:table-cell">{category.id}</TableCell>
			<TableCell>{category.name}</TableCell>
			<TableCell>
				<Button
					className="w-full"
					size="sm"
					variant="outline"
					formAction={deleteUserWithId}
					disabled
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
}
