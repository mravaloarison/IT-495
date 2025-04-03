"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AlertError from "@/components/alert_error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_utils";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(false);
		setErrorMessage("");

		if (email === "" || password === "") {
			setError(true);
			setErrorMessage("Please fill in all fields");
			setLoading(false);
			return;
		}
		try {
			signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					window.location.href = "/dashboard";
				})
				.catch((error) => {
					setError(true);
					setErrorMessage(error.message);

					setLoading(false);
				});
		} catch (error) {
			setError(true);
			setErrorMessage("An error occurred. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<div className="flex flex-col gap-6 w-full max-w-md mx-auto items-start">
				<p className="text-2xl font-semibold text-gray-500 text-center w-full">
					Sign in
				</p>
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
				<Button
					className="w-full"
					disabled={loading}
					onClick={handleSignIn}
				>
					{loading ? "Loading..." : "Login"}
				</Button>
				<Button variant="outline" className="w-full" disabled>
					<Link2 />
					Continue with Google
				</Button>
				<Button
					variant="secondary"
					className="w-full"
					disabled={loading}
				>
					<Link
						href="/no_user"
						className="w-full flex items-center gap-2 justify-center"
					>
						<ArrowLeft />
						Go back
					</Link>
				</Button>
			</div>

			<AlertError
				errorMessage={errorMessage}
				isOpen={error}
				callback={() => {
					setError(false);
					setErrorMessage("");
				}}
			/>
		</div>
	);
}
