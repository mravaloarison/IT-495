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
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function AlertError({
	errorMessage,
	isOpen,
	callback,
}: {
	errorMessage: string;
	isOpen: boolean;
	callback: () => void;
}) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setOpen(true);
		}
	}, [isOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-start gap-2">
						<TriangleAlert />
						Something went wrong
					</AlertDialogTitle>
					<AlertDialogDescription>
						{errorMessage}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							setOpen(false);
							callback();
						}}
					>
						Ok
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
