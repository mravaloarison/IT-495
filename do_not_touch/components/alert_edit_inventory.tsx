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

export default function AlertEditInventoryItem(props: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialData: {
		name: string;
		image: string;
		price: number;
		category: string;
	};
	onConfirm: (updated: {
		name: string;
		image: string;
		price: number;
		category: string;
	}) => void;
}) {
	const [open, setOpen] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemImage, setItemImage] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const [itemSection, setItemSection] = useState("");

	useEffect(() => {
		if (props.isOpen) {
			const { name, image, price, category } = props.initialData;
			setItemName(name);
			setItemImage(image);
			setItemPrice(price);
			setItemSection(category);
			setOpen(true);
		}
	}, [props.isOpen, props.initialData]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Inventory Item</AlertDialogTitle>
					<AlertDialogDescription>
						Update your item’s information.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Item name</p>
						<Input
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Image URL</p>
						<Input
							value={itemImage}
							onChange={(e) => setItemImage(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Set Price</p>
						<Input
							type="number"
							value={itemPrice}
							onChange={(e) =>
								setItemPrice(Number(e.target.value))
							}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Item Section</p>
						<Input
							value={itemSection}
							onChange={(e) => setItemSection(e.target.value)}
						/>
					</div>
				</div>
				<AlertDialogFooter className="flex gap-4">
					<Button
						variant="outline"
						onClick={() => {
							setOpen(false);
							props.onOpenChange(false);
						}}
					>
						Cancel
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							props.onConfirm({
								name: itemName,
								image: itemImage,
								price: itemPrice,
								category: itemSection,
							});
							setOpen(false);
							props.onOpenChange(false);
						}}
					>
						Save Changes
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
