import { ItemsTable } from "~/app/_components/tables/items-table";
import { api } from "~/trpc/server";

export default async function ItemsPage() {
	const items = await api.item.getAll();

	return <div>
		<div className="container mt-3">
			<ItemsTable items={items} offset={null} />
		</div>
	</div>
}
