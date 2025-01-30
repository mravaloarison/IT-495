"use client";

import React, { useState } from "react";
import { auth } from "./firebase_setup";
import { onAuthStateChanged } from "firebase/auth";
import NoUserView from "./views/no_user";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [user, setUser] = useState("");

	onAuthStateChanged(auth, (user) => {
		user ? setUser(user.displayName ?? user.email ?? "") : setUser("");
	});

	return (
		<>
			{user ? (
				<>
					<p>Hello {user}!</p>
					<Button onClick={() => auth.signOut()}>Sign Out</Button>
				</>
			) : (
				<NoUserView />
			)}
		</>
	);
}
