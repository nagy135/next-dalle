import ItemCard from "~/app/_components/item-card";
import { api } from "~/trpc/server";

type CategoryPageProps = {
	params: {
		id: string;
	};
};

export default async function CategoryPage({ params: { id } }: CategoryPageProps) {
	const categoryId = Number.parseInt(id);
	const items = await api.item.getByCategoryId(categoryId);
	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-xl gap-2">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 pt-24 ">
				<h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
					Shop
				</h1>
			</div>
			<div>Top 5</div>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{items.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</div>
		</main>
	);
}
