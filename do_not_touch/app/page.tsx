"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	if (!user) {
		// redirect to no user page
		router.replace("/no_user");
	}

	return <div></div>;
}
