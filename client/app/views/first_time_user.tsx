"use client";

import { Button } from "@/components/ui/button";
import FirstTimeUser from "./first_time_user/first_time_user";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { addUser } from "../firebase_setup";

export default function FirstTimeUserView({ user }: { user: string | null }) {
	const [isAccountTypeFormCompleted, setIsAccountTypeFormCompleted] =
		useState(false);
	const [
		isContactInformationFormCompleted,
		setIsContactInformationFormCompleted,
	] = useState(false);
	const [isProfileFormCompleted, setIsProfileFormCompleted] = useState(false);

	const handleAccountTypeFormCompleted = (value: boolean) => {
		setIsAccountTypeFormCompleted(value);
	};

	const handleContactInformationFormCompleted = (value: boolean) => {
		setIsContactInformationFormCompleted(value);
	};

	useEffect(() => {
		setIsProfileFormCompleted(
			isAccountTypeFormCompleted && isContactInformationFormCompleted
		);
		console.log(isProfileFormCompleted, "state of isProfileFormCompleted");
	}, [isAccountTypeFormCompleted, isContactInformationFormCompleted]);

	function CreateProfile() {
		const accountType = localStorage.getItem("accountType");
		const contactInformation = JSON.parse(
			localStorage.getItem("contactInformation") || "{}"
		);

		const data = {
			accountType: accountType,
			...contactInformation,
			email: user,
		};

		addUser(data);
	}

	return (
		<>
			<FirstTimeUser
				emailAdrress={user}
				accountTypeCallback={handleAccountTypeFormCompleted}
				contactInformationCallback={
					handleContactInformationFormCompleted
				}
			/>
			<Button disabled={!isProfileFormCompleted} onClick={CreateProfile}>
				<User />
				Create profile
			</Button>
		</>
	);
}
