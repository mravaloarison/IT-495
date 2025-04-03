"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth, getUserFromDB } from "../firebase_utils";
import { onAuthStateChanged } from "firebase/auth";

export default function Page() {
	const [user, setUser] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [userType, setUserType] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.email);
			} else {
				window.location.href = "/";
			}
			setLoading(false);
		});

		getUserType();

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (user) {
			getUserType();
		}
	}, [user]);

	const getUserType = async () => {
		console.log("Getting user type");
		if (user) {
			const userData = await getUserFromDB(user);

			if (userData) {
				setUserType(userData.type);
			}
		}
	};

	return (
		<div>
			{user ? (
				<div className="max-w-2xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
					<Button
						onClick={() => {
							auth.signOut();
						}}
					>
						Sign out
					</Button>
					<div className="flex items-center justify-center gap-6">
						{userType && (
							<p className="text-2xl font-semibold">{userType}</p>
						)}
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
