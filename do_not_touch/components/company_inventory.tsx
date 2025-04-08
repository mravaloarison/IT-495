import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase_utils";
import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

import AlertEditInventoryItem from "./alert_edit_inventory";
import { doc, updateDoc, deleteField } from "firebase/firestore";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Item = {
	price: number;
	picURL: string;
};

export default function CompanyInventoryView(props: {
	company_name: string;
	user: string;
}) {
	const router = useRouter();

	const [inventory, setInventory] = useState<
		Record<string, Record<string, Item>>
	>({});

	const [editingItem, setEditingItem] = useState<{
		category: string;
		itemName: string;
		item: Item;
	} | null>(null);

	const [editDialogOpen, setEditDialogOpen] = useState(false);

	useEffect(() => {
		const fetchInventory = async () => {
			const inventoryCollection = collection(
				db,
				"companies",
				props.user,
				"inventory"
			);

			const categoryDocs = await getDocs(inventoryCollection);
			const data: Record<string, Record<string, Item>> = {};

			for (const docSnap of categoryDocs.docs) {
				const categoryName = docSnap.id;
				data[categoryName] = docSnap.data() as Record<string, Item>;
			}

			setInventory(data);
		};

		fetchInventory();
	}, [props.company_name]);

	const handleEditConfirm = async (updated: {
		name: string;
		image: string;
		price: number;
		category: string;
	}) => {
		if (!editingItem) return;

		const { itemName, category } = editingItem;

		try {
			const oldRef = doc(
				db,
				"companies",
				props.user,
				"inventory",
				category
			);
			await updateDoc(oldRef, {
				[itemName]: deleteField(),
			});

			const newRef = doc(
				db,
				"companies",
				props.user,
				"inventory",
				updated.category
			);
			await updateDoc(newRef, {
				[updated.name]: {
					price: updated.price,
					picURL: updated.image,
				},
			});

			setInventory((prev) => {
				const newInventory = { ...prev };

				delete newInventory[category][itemName];

				if (Object.keys(newInventory[category]).length === 0) {
					delete newInventory[category];
				}

				if (!newInventory[updated.category]) {
					newInventory[updated.category] = {};
				}
				newInventory[updated.category][updated.name] = {
					price: updated.price,
					picURL: updated.image,
				};

				return newInventory;
			});

			toast.info("an item has been updated successfully.");
			setEditDialogOpen(false);
			setEditingItem(null);
		} catch (err) {
			console.error(err);
			toast.error("Failed to update item.");
		}
	};

	const handleDelete = async (category: string, itemName: string) => {
		try {
			const itemRef = doc(
				db,
				"companies",
				props.user,
				"inventory",
				category
			);
			await updateDoc(itemRef, {
				[itemName]: deleteField(),
			});

			setInventory((prev) => {
				const updated = { ...prev };
				delete updated[category][itemName];

				if (Object.keys(updated[category]).length === 0) {
					delete updated[category];
				}

				return updated;
			});

			toast.info("An item has been deleted from your inventory.");
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete item.");
		}
	};

	return (
		<div className="flex flex-col gap-4 mt-2">
			<h2 className="text-2xl text-gray-500 font-semibold">Inventory</h2>
			<div className="flex flex-col gap-4">
				{Object.entries(inventory).map(([category, items]) => (
					<div key={category} className="flex flex-col gap-4">
						<h4 className="text-lg font-semibold capitalize">
							{category}
						</h4>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{Object.entries(items).map(
								([itemName, itemData], i) => (
									<Card key={i}>
										<img
											src={itemData.picURL}
											alt={itemName}
											className="object-cover md:object-scale-down h-20 mx-auto"
										/>
										<CardHeader>
											<CardTitle>{itemName}</CardTitle>
											<CardDescription>
												${itemData.price.toFixed(2)}
											</CardDescription>
										</CardHeader>
										<CardFooter>
											<div className="flex justify-between w-full">
												<Button
													variant="secondary"
													onClick={() => {
														setEditingItem({
															category,
															itemName,
															item: itemData,
														});
														setEditDialogOpen(true);
													}}
												>
													<Pen />
												</Button>
												<Button
													variant="outline"
													onClick={() =>
														handleDelete(
															category,
															itemName
														)
													}
												>
													<Trash />
												</Button>
											</div>
										</CardFooter>
									</Card>
								)
							)}
						</div>
					</div>
				))}
			</div>
			{editingItem && (
				<AlertEditInventoryItem
					isOpen={editDialogOpen}
					onOpenChange={setEditDialogOpen}
					initialData={{
						name: editingItem.itemName,
						image: editingItem.item.picURL,
						price: editingItem.item.price,
						category: editingItem.category,
					}}
					onConfirm={handleEditConfirm}
				/>
			)}
		</div>
	);
}
