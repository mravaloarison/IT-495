"use client";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { MapPin, Search } from "lucide-react";

interface SearchFormProps {
	displayName: {
		text: string;
		languageCode: string;
	};
	formattedAddress: string;
	id: string;
}

export default function AlertLocation({
	user,
	isOpen,
	curentLocation,
	callback,
}: {
	user: string;
	isOpen: boolean;
	curentLocation: string;
	callback: (newLocation: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [newLocation, setNewLocation] = useState("");
	const [autocompleteResults, setAutocompleteResults] = useState<
		SearchFormProps[]
	>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewLocation(e.target.value);

		const formData = new FormData();
		formData.append("search", e.target.value);

		fetch("/api/place_autocomplete", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				try {
					const places = data.places;

					console.log("Autocomplete results: ", places);

					if (places) {
						setAutocompleteResults(places);
					}
				} catch {
					console.log("No places found");
				}
			});
	};

	useEffect(() => {
		if (isOpen) {
			setOpen(true);
		}
	}, [isOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Managing location</AlertDialogTitle>
					<AlertDialogDescription>
						<span className="text-gray-500">
							Please enter the new location for {user} below.
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="relative">
					<Input
						id="search"
						placeholder="Type to search..."
						className="h-8 pl-7"
						autoComplete="off"
						value={newLocation}
						onChange={handleChange}
					/>
					<Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
				</div>
				<div className="relative">
					{autocompleteResults.length > 0 && (
						<div className="absolute z-10 w-full overflow-auto rounded-md border bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-1 focus:outline-none">
							{autocompleteResults.map((place) => (
								<Button
									key={place.id}
									variant="link"
									onClick={() => {
										setNewLocation(place.formattedAddress);
										setAutocompleteResults([]);
									}}
								>
									<MapPin />
									{place.formattedAddress}
								</Button>
							))}
						</div>
					)}
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => callback(curentLocation)}
						className="mt-2 md:mt-0"
					>
						Cancel
					</AlertDialogCancel>
					<Button
						className="mt-2 md:mt-0"
						onClick={() => {
							newLocation === ""
								? callback(curentLocation)
								: callback(newLocation);

							setOpen(false);
						}}
					>
						Save changes
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
