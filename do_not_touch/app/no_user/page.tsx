"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoUser() {
	const router = useRouter();

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center p-6">
			<div className="flex flex-col items-center gap-6 justify-center max-w-lg w-full">
				<TriangleAlert className="h-16 w-16 text-gray-500" />
				<div className="text-2xl font-semibold text-center text-gray-500">
					You are not signed in. Please sign in or create an account
					to continue.
				</div>
				<Button
					onClick={() => router.replace("/sign_in")}
					className="w-full hover:cursor-pointer"
				>
					Sign in
				</Button>
				<Button
					onClick={() => router.replace("/sign_up")}
					className="w-full hover:cursor-pointer"
					variant="secondary"
				>
					Sign up
				</Button>
			</div>
		</div>
	);
}
