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
import { addUserToDB, addUserToDriverDB, auth } from "@/app/firebase_utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { AlertDestructive } from "./alert_driver";

export default function NewDriverView() {
	const router = useRouter();
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
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

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value);
	};

	const handlePhoneNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setPhoneNumber(e.target.value);
	};

	const handleDriverLicenseNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDriverLicenseNumber(e.target.value);
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

		if (
			!fullname ||
			!email ||
			!password ||
			!phoneNumber ||
			!driverLicenseNumber
		) {
			setError(true);
			setErrorMessage("All fields are required");
			setLoading(false);
			return;
		}

		const data = {
			fullname: fullname,
			email: email,
			phone_number: phoneNumber,
			driver_license_number: driverLicenseNumber,
			type: "driver",
		};

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				addUserToDB(data)
					.then(() => {
						addUserToDriverDB(data)
							.then(() => {
								setLoading(false);

								router.replace("/dashboard");
								router.refresh();
							})
							.catch((error) => {
								console.log(
									"Error adding user to driver DB:",
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
				<CardTitle>Driver</CardTitle>
				<CardDescription>
					Sign up to create a new Driver account.
				</CardDescription>
				<AlertDestructive />
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="fullname">Fullname</Label>
					<Input
						placeholder="Fullname"
						disabled
						value={fullname}
						onChange={handleFullnameChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						placeholder="Email"
						disabled
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						placeholder="Password"
						disabled
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirm_password">Confirm Password</Label>
					<Input
						type="password"
						placeholder="Confirm Password"
						disabled
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone_number">Phone number</Label>
					<Input
						placeholder="Phone number"
						disabled
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="driver_license_number">
						Driver License Number
					</Label>
					<Input
						placeholder="Driver license number"
						disabled
						value={driverLicenseNumber}
						onChange={handleDriverLicenseNumberChange}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					className="hover:cursor-pointer"
					onClick={handleSubmit}
					disabled
				>
					<Lock />
					{loading ? "Loading..." : "Sign up"}
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
