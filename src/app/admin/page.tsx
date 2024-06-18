import { ItemsTable } from "../_components/items-table";
import { api } from "~/trpc/server";

export default async function Admin() {
	const items = await api.item.getAll();

	return <div>
		<div className="container mt-3">
			<ItemsTable items={items} offset={null} />
		</div>
	</div>
}
