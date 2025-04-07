"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth } from "../../firebase_utils";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomerNavView from "@/components/customer_nav";

export default function Page({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [user, setUser] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.email);
			} else {
				// redirect to no user page
				router.replace("/no_user");
				router.refresh();
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div>
			{user ? (
				<div className="max-w-4xl mx-auto">
					<div className="flex flex-col items-center justify-between gap-4 p-4">
						<header className="flex justify-between items-center w-full border-b pb-4">
							<div className="flex gap-2 items-center text-gray-500 hover:cursor-pointer">
								<Settings />
								<h1 className="font-semibold ">{user}</h1>
							</div>
							<Button
								variant="outline"
								onClick={() => {
									setLoading(true);
									auth.signOut();
								}}
								className="hover:cursor-pointer"
								disabled={loading}
							>
								<LogOut />
								Sign out
							</Button>
						</header>
						<main className="w-full h-full">
							<CustomerNavView />
							{children}
						</main>
						<footer className="font-semibold text-xs text-gray-500">
							&#169; by Rava
						</footer>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center h-screen">
					Lol
				</div>
			)}
		</div>
	);
}
