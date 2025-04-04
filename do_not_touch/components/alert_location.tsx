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
import { Search } from "lucide-react";

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewLocation(e.target.value);
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
				<div>
					<Button variant="link">
						434 Main street, new york, new rochelle, 10801
					</Button>
					<Button variant="link">
						434 Main street, new york, new rochelle, 10801
					</Button>
					<Button variant="link">
						434 Main street, new york, new rochelle, 10801
					</Button>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => callback(curentLocation)}>
						Cancel
					</AlertDialogCancel>
					<Button
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
