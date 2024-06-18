import { getServerAuthSession } from "~/server/auth";
import Profile from "../_components/profile";
import { RedirectType, redirect } from "next/navigation";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerAuthSession();
	if (!session) {
		redirect("/api/auth/signin", RedirectType.replace);
	} else
		return <div>
			<Profile session={session} />
			<div className="container mt-3">
				{children}
			</div>
		</div>
}
