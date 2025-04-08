"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function AlertUpdatePersonalInfo(props: {
	isOpen: boolean;
	user: string;
	onOpenChange: (open: boolean) => void;
	onConfirm: (name: string, logoURL: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [Name, setName] = useState("");
	const [logoURL, setLogoURL] = useState("");

	useEffect(() => {
		if (props.isOpen) {
			setOpen(true);
		}
	}, [props.isOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Update Details</AlertDialogTitle>
					<AlertDialogDescription>
						Update your account details here.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Name</p>
						<Input
							value={Name}
							placeholder="Type a name here"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Logo URL</p>
						<Input
							value={logoURL}
							placeholder="Logo URL (eg: https://example.com/logo.png)"
							onChange={(e) => setLogoURL(e.target.value)}
						/>
					</div>
				</div>
				<AlertDialogFooter className="flex gap-4">
					<Button
						variant="outline"
						onClick={() => {
							props.onOpenChange(false);
							setOpen(false);
						}}
					>
						Close
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							props.onConfirm(Name, logoURL);
							setOpen(false);
						}}
					>
						Update
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
