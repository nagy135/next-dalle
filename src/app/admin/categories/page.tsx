import { CategoriesTable } from "~/app/_components/tables/categories-table";
import { api } from "~/trpc/server"

export default async function CategoriesPage() {
	const categories = await api.category.getAll();

	return <div>
		<div className="container mt-3">
			<CategoriesTable categories={categories} offset={null} />
		</div>
	</div>
}
