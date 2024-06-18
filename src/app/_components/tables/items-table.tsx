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
import { deleteItemById } from '~/lib/actions';

export function ItemsTable({
	items,
	offset
}: {
	items: ItemEntity[];
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
