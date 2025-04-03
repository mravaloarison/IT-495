"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<div className="flex flex-col gap-6 w-full max-w-md mx-auto items-start">
				<p className="text-2xl font-semibold text-gray-500 text-center w-full">
					Sign in
				</p>
				<Input type="email" placeholder="Email" />

				<Input type="password" placeholder="Password" />
				<Button className="w-full">Login</Button>
				<Button variant="outline" className="w-full" disabled>
					<Link2 />
					Continue with Google
				</Button>
				<Button variant="secondary" className="w-full">
					<Link
						href="/no_user"
						className="w-full flex items-center gap-2 justify-center"
					>
						<ArrowLeft />
						Go back
					</Link>
				</Button>
			</div>
		</div>
	);
}
