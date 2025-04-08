"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogIn, UserRoundPen } from "lucide-react";
import { gsap } from "gsap";

export default function NoUser() {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const [leaving, setLeaving] = useState(false);

	// Slide in animation on mount
	useEffect(() => {
		if (containerRef.current) {
			gsap.fromTo(
				containerRef.current,
				{ opacity: 0, x: 50 },
				{ opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	const handleRouteChange = (path: string) => {
		if (containerRef.current) {
			setLeaving(true);
			gsap.to(containerRef.current, {
				opacity: 0,
				x: -10,
				duration: 0.5,
				ease: "power2.in",
				onComplete: () => {
					router.replace(path);
					router.refresh();
				},
			});
		}
	};

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-6">
			<div
				ref={containerRef}
				className="flex flex-col md:flex-row items-center justify-between max-w-5xl w-full gap-10"
			>
				{/* Left Text Section */}
				<div className="flex flex-col gap-6 max-w-md">
					<h1 className="text-4xl font-bold text-gray-800">
						Welcome to FitFinder
					</h1>
					<p className="text-gray-600 text-lg">
						FitFinder delivers fashion to your door — and smart
						style advice from our AI right to your screen.
					</p>
					<div className="flex gap-4">
						<Button onClick={() => handleRouteChange("/sign_in")}>
							<LogIn className="mr-2 h-4 w-4" />
							Sign in
						</Button>
						<Button
							onClick={() => handleRouteChange("/sign_up")}
							variant="secondary"
						>
							<UserRoundPen className="mr-2 h-4 w-4" />
							Create Account
						</Button>
					</div>
				</div>

				{/* Right Visual Section */}
				<div className="w-full md:w-1/2">
					<img
						src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Fashion illustration"
						className="rounded-xl shadow-lg object-cover w-full h-72 md:h-96"
					/>
				</div>
			</div>
		</div>
	);
}
