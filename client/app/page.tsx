"use client";

import React, { useState, useEffect } from "react";
import { auth } from "./firebase_setup";
import { onAuthStateChanged } from "firebase/auth";
import NoUserView from "./views/no_user";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import FirstTimeUserView from "./views/first_time_user";

export default function Home() {
	const [user, setUser] = useState<string | null>(null);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

	useEffect(() => {
		const checkUser = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				setUser(authUser.email ?? "");
			} else {
				setUser(null);
			}
		});

		return () => checkUser();
	}, []);

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
