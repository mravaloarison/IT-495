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

export default function NewDriverView() {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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

	const handleDriverLicenseNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDriverLicenseNumber(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!fullname ||
			!email ||
			!password ||
			!phoneNumber ||
			!driverLicenseNumber
		) {
			setError(true);
			setErrorMessage("All fields are required");
			return;
		}
		// Handle form submission logic here
		console.log("Form submitted:", {
			fullname,
			email,
			password,
			phoneNumber,
			driverLicenseNumber,
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Driver</CardTitle>
				<CardDescription>
					Sign up to create a new Driver account.
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
					<Label htmlFor="phone_number">Phone number</Label>
					<Input
						placeholder="Phone number"
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
						value={driverLicenseNumber}
						onChange={handleDriverLicenseNumberChange}
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleSubmit}>Sign up</Button>
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
