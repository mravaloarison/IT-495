"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!user) {
			router.replace("/no_user");
		}
	}, [user, router]);

	return <div></div>;
}
