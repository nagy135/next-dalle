import { api } from "~/trpc/server";
import Navigation from "../_components/navigation";

export default async function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigationCategories = await api.category.getNWithChildren(5);

	return (
		<>
			<Navigation categories={navigationCategories} />
			{children}
		</>
	)
}
