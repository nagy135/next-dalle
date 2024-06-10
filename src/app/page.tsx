import { api } from "~/trpc/server";
import ItemCard from "./_components/item-card";

export default async function Home() {
	const items = await api.item.getAll();
	return (
		<main className="flex min-h-screen flex-col items-center justify-center text-xl">
			{items.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</main>
	);
}

