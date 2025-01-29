"use client";

import { Button } from "@/components/ui/button";
import { ContinueWithGoogle } from "./firebase_setup";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
	const [user, setUser] = useState("");

	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen">
			{user !== "" ? (
				<p>Hello, {user}!</p>
			) : (
				<>
					<Button onClick={ContinueWithGoogle}>
						Continue with Google
					</Button>
					<p className="text-sm">
						No account yet?{" "}
						<Link href="/" className="text-blue-500">
							Sign up here
						</Link>
					</p>
				</>
			)}
		</div>
	);
}
