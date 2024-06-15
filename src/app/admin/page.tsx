import { RedirectType, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Profile from "../_components/profile";
import { ItemsTable } from "../_components/items-table";
import { api } from "~/trpc/server";

export default async function Admin() {
	const session = await getServerAuthSession();
	const items = await api.item.getAll();

	if (!session) {
		redirect("/api/auth/signin", RedirectType.replace);
	} else
		return <div>
			<Profile session={session} />
			<div className="container mt-3">
				<ItemsTable items={items} offset={null} />
			</div>
		</div>
}
