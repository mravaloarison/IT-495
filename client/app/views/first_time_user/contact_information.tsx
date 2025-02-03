import { CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

interface FirstTimeUserProps {
	emailAdrress: string | null;
	onUpdate: (value: boolean) => void;
}

export default function ContactInfromationView({
	emailAdrress,
	onUpdate,
}: FirstTimeUserProps): JSX.Element {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		const isCompleted = firstName.trim() !== "" && lastName.trim() !== "";

		isCompleted &&
			localStorage.setItem(
				"contactInformation",
				JSON.stringify({ firstName, lastName })
			);

		onUpdate(isCompleted);
	}, [firstName, lastName]);

	return (
		<CarouselItem>
			<div className="w-full p-2 flex flex-col gap-6">
				<p className="font-semibold text-lg text-center">
					Contact Information
				</p>
				<Input
					placeholder="First name"
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<Input
					placeholder="Last name"
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<Input
					placeholder="Email"
					disabled
					value={emailAdrress ?? ""}
				/>
			</div>
		</CarouselItem>
	);
}
