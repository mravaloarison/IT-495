"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db, addItemToCart } from "@/app/firebase_utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

type InventoryItem = {
	itemName: string;
	price: number;
	picURL: string;
	company: string;
};

export default function Page() {
	const [items, setItems] = useState<InventoryItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSavedItems = async () => {
			const user = auth.currentUser;
			if (!user) return;

			const savedRef = collection(
				db,
				"customers",
				user.email || "",
				"saved"
			);
			const snapshot = await getDocs(savedRef);

			const data: InventoryItem[] = snapshot.docs.map(
				(doc) => doc.data() as InventoryItem
			);
			setItems(data);
			setLoading(false);
		};

		fetchSavedItems();
	}, []);

	const removeFromSaved = async (itemName: string) => {
		const user = auth.currentUser;
		if (!user) return;

		await deleteDoc(
			doc(db, "customers", user.email || "", "saved", itemName)
		);
		setItems((prev) => prev.filter((i) => i.itemName !== itemName));
		toast.info("Item removed from saved list");
	};

	const handleAddToCart = async (item: InventoryItem) => {
		const user = auth.currentUser;
		if (!user) return;

		try {
			const count = await addItemToCart(user.email || "", item);
			toast.success(`Added to cart${count > 1 ? ` (x${count})` : ""}`);
		} catch (err) {
			console.error(err);
			toast.error("Failed to add to cart");
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold pb-4 pt-6">Saved Items</h1>

			{loading ? (
				<p className="text-gray-500">Loading saved items...</p>
			) : items.length === 0 ? (
				<p className="text-gray-500">You have no saved items.</p>
			) : (
				<div className="md:grid md:grid-cols-3 flex flex-col gap-4">
					{items.map((item) => (
						<div
							key={item.itemName}
							className="border rounded p-3 text-sm shadow-sm"
						>
							<img
								src={item.picURL}
								alt={item.itemName}
								className="h-46 w-full object-cover rounded mb-2"
							/>
							<p className="font-medium">{item.itemName}</p>
							<p className="text-gray-600">${item.price}</p>
							<p className="text-xs text-gray-400 mt-1">
								From: {item.company}
							</p>

							<div className="flex justify-between mt-4">
								<Button
									variant="outline"
									onClick={() =>
										removeFromSaved(item.itemName)
									}
								>
									<Trash2 />
									Remove
								</Button>
								<Button
									variant="secondary"
									onClick={() => handleAddToCart(item)}
								>
									<ShoppingBag />
									Add to cart
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
