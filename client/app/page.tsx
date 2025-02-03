"use client";

import React, { useState, useEffect } from "react";
import { auth, isUser } from "./firebase_setup";
import { onAuthStateChanged } from "firebase/auth";
import NoUserView from "./views/no_user";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import FirstTimeUserView from "./views/first_time_user";

export default function Home() {
	const [user, setUser] = useState<string | null>(null);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				setUser(authUser.email ?? "");
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (user) {
			setLoading(true);
			isUser(user).then((exists) => {
				setIsFirstTimeUser(!exists);
				setLoading(false);
			});
		}
	}, [user]);

	if (loading) {
		return (
			<div className="flex h-screen justify-center items-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<>
			{user ? (
				<div className="flex flex-col items-center gap-4 h-screen justify-center">
					{isFirstTimeUser ? (
						<FirstTimeUserView user={user} />
					) : (
						<>
							<p>Hello {user}!</p>
							<Button
								variant="outline"
								onClick={() => auth.signOut()}
							>
								<LogOut />
								Sign Out
							</Button>
						</>
					)}
				</div>
			) : (
				<NoUserView />
			)}
		</>
	);
}
