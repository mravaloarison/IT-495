"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import AlertError from "@/components/alert_error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_utils";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			gsap.fromTo(
				containerRef.current,
				{ opacity: 0, x: 50 },
				{ opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	const animateAndRedirect = (path: string) => {
		if (containerRef.current) {
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

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		setErrorMessage("");

		if (!email || !password) {
			setError(true);
			setErrorMessage("Please fill in all fields");
			setLoading(false);
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			animateAndRedirect("/dashboard");
		} catch (error: any) {
			setError(true);
			setErrorMessage(
				error.message || "An error occurred. Please try again."
			);
			setLoading(false);
		}
	};

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-6">
			<div
				ref={containerRef}
				className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-xl shadow-md"
			>
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-800">
						Welcome Back
					</h2>
					<p className="text-gray-500 mt-1">
						Log in to your FitFinder account
					</p>
				</div>

				<form className="flex flex-col gap-4" onSubmit={handleSignIn}>
					<Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</Button>
				</form>

				<Button
					variant="secondary"
					className="w-full flex items-center gap-2"
					disabled={loading}
					onClick={() => animateAndRedirect("/no_user")}
				>
					<ArrowLeft className="w-4 h-4" />
					Go back
				</Button>

				<AlertError
					errorMessage={errorMessage}
					isOpen={error}
					callback={() => {
						setError(false);
						setErrorMessage("");
					}}
				/>
			</div>
		</div>
	);
}
