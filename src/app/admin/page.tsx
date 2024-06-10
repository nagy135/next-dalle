import { RedirectType, redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import Profile from "../_components/profile";

export default async function Admin() {
	const session = await getServerAuthSession();

	if (!session) {
		redirect("/api/auth/signin", RedirectType.replace);
	} else
		return <div><Profile session={session} /></div>
}
