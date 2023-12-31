import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

import { User } from "./user";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main>
			<div>Home</div>
			<h2>Server Session</h2>
			<pre>{JSON.stringify(session)}</pre>
			<h2>Client Call</h2>
			<User />
		</main>
	);
}
