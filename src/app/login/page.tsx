import { getServerAuthSession } from "~/server/auth";

export default async function Login() {
	const user = await getServerAuthSession();
	console.log("================\n", "user: ", user, "\n================");
	return <div>login</div>
}
