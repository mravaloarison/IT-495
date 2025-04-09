"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import AlertError from "./alert_error";
import { addUserToCustomerDB, addUserToDB, auth } from "@/app/firebase_utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserRoundPen } from "lucide-react";

export default function NewCustomerView() {
	const router = useRouter();
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFullname(e.target.value);
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const handlePhoneNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setPhoneNumber(e.target.value);
	};
	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (password !== confirmPassword) {
			setError(true);
			setErrorMessage("Passwords do not match");
			setLoading(false);
			return;
		}
		if (!fullname || !email || !password || !phoneNumber) {
			setError(true);
			setErrorMessage("All fields are required");
			setLoading(false);
			return;
		}

		const data = {
			fullname: fullname,
			email: email,
			phone_number: phoneNumber,
			type: "customer",
		};

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				addUserToDB(data)
					.then(() => {
						addUserToCustomerDB(data)
							.then(() => {
								router.replace("/dashboard");
								router.refresh();
							})
							.catch((error) => {
								console.log(
									"Error adding user to customer DB:",
									error
								);
								setLoading(false);
								setError(true);
								setErrorMessage(error.message);
							});
					})
					.catch((error) => {
						setLoading(false);
						setError(true);
						setErrorMessage(error.message);
					});
			})
			.catch((error) => {
				const code = error.code;
				const message = error.message;
				setError(true);

				if (code === "auth/invalid-email") {
					setErrorMessage("Invalid email");
				} else {
					setErrorMessage(message);
				}

				setLoading(false);
			});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Customer</CardTitle>
				<CardDescription>
					Sign up to create a new customer account.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="fullname">Fullname</Label>
					<Input
						placeholder="Fullname"
						value={fullname}
						onChange={handleFullnameChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirm_password">Confirm password</Label>
					<Input
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone_number">Phone number</Label>
					<Input
						placeholder="Phone number"
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					className="hover:cursor-pointer"
					onClick={handleSubmit}
					disabled={loading}
				>
					<UserRoundPen />
					{loading ? "Loading..." : "Create account"}
				</Button>
			</CardFooter>
			<AlertError
				errorMessage={errorMessage}
				isOpen={error}
				callback={() => {
					setError(false);
					setErrorMessage("");
				}}
			/>
		</Card>
	);
}
