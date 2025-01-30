"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContinueWithGoogle } from "../firebase_setup";
import SignUpForm from "./forms/sign_up";
import SignInForm from "./forms/sign_in";

export default function AuthenticationView(signup: boolean) {
	return (
		<>
			<div className="max-w-xs w-full flex flex-col gap-4">
				{signup ? <SignUpForm /> : <SignInForm />}
				<Separator />
				<Button onClick={ContinueWithGoogle} variant="secondary">
					<img
						src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
						className="w-5 h-5"
					/>
					Continue with Google
				</Button>
			</div>
			<p className="text-sm text-gray-400">
				{signup ? "Already have an account?" : "Don't have an account?"}{" "}
				<Link
					href={signup ? "/sign_up" : "/sign_in"}
					className="text-blue-500"
				>
					{signup ? "Sign in" : "Sign up"}
				</Link>
			</p>
		</>
	);
}
