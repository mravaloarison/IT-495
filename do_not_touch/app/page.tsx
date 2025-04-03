"use client";
import React, { useState } from "react";

export default function Home() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	if (!user) {
		// redirect to no user page
		window.location.href = "/no_user";
	}

	return <div></div>;
}
