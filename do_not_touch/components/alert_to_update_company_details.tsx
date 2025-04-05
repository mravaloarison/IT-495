"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function AlertUpdateCompanyDetails(props: {
	isOpen: boolean;
	user: string;
	onOpenChange: (open: boolean) => void;
	onConfirm: (companyName: string, location: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [companyName, setCompanyName] = useState("");
	const [logoURL, setLogoURL] = useState("");

	useEffect(() => {
		if (props.isOpen) {
			setOpen(true);
		}
	}, [props.isOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" className="hidden">
					Update Company Details
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Update Company Details</AlertDialogTitle>
					<AlertDialogDescription>
						Update your company name and logo.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Company Name</p>
						<Input
							value={companyName}
							placeholder="Company Name (eg: Nike)"
							onChange={(e) => setCompanyName(e.target.value)}
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
							props.onConfirm(companyName, logoURL);
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
