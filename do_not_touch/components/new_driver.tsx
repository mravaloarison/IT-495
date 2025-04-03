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

export default function NewDriverView() {
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
					<Input placeholder="Fullname" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input type="email" placeholder="Email" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input type="password" placeholder="Password" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="phone_number">Phone number</Label>
					<Input placeholder="Phone number" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="driver_license_number">
						Driver License Number
					</Label>
					<Input placeholder="Driver license number" />
				</div>
			</CardContent>
			<CardFooter>
				<Button>Sign up</Button>
			</CardFooter>
		</Card>
	);
}
