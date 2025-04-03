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

export default function NewCompanyView() {
	const [companyName, setCompanyName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleCompanyNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCompanyName(e.target.value);
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

	const handleCompanyAddressChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setCompanyAddress(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!companyName ||
			!email ||
			!password ||
			!phoneNumber ||
			!companyAddress
		) {
			setError(true);
			setErrorMessage("All fields are required");
			return;
		}
		// Handle form submission logic here
		console.log("Form submitted:", {
			companyName,
			email,
			password,
			phoneNumber,
			companyAddress,
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Company</CardTitle>
				<CardDescription>
					Sign up to create a new Company account.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="company_name">Company name</Label>
					<Input
						placeholder="Company name"
						value={companyName}
						onChange={handleCompanyNameChange}
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
					<Label htmlFor="company_address">Company Address</Label>
					<Input
						placeholder="Company Address"
						value={companyAddress}
						onChange={handleCompanyAddressChange}
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
