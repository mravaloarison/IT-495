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

export default function AlertAddToInventory(props: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (item: {
		name: string;
		image: string;
		price: number;
		section: string;
	}) => void;
}) {
	const [open, setOpen] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemImage, setItemImage] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const [itemSection, setItemSection] = useState("");

	useEffect(() => {
		if (props.isOpen) {
			setOpen(true);
		}
	}, [props.isOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline" className="hidden">
					Add to Inventory
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Add to Inventory</AlertDialogTitle>
					<AlertDialogDescription>
						Add a new item to your inventory.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Item name</p>
						<Input
							placeholder="Item Name (eg: Air Jordan)"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Image URL</p>
						<Input
							placeholder="Image URL"
							value={itemImage}
							onChange={(e) => setItemImage(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<p className="text-sm text-gray-500">Set Price</p>
						<Input
							placeholder="Item Price"
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
							placeholder="Section (eg: Shoes, Clothes)"
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
								section: itemSection,
							});
							setOpen(false);
							props.onOpenChange(false);
						}}
					>
						Confirm
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
