"use client";

import { useEffect, useState } from "react";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase_utils";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

type CartItem = {
	itemName: string;
	price: number;
	picURL: string;
	company: string;
	count: number;
};

export default function Page() {
	const [items, setItems] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [orderPlaced, setOrderPlaced] = useState(false);

	useEffect(() => {
		const fetchCartItems = async () => {
			const user = auth.currentUser;
			if (!user) return;

			const cartRef = collection(
				db,
				"customers",
				user.email || "",
				"cart"
			);
			const snapshot = await getDocs(cartRef);

			const data: CartItem[] = snapshot.docs.map(
				(doc) => doc.data() as CartItem
			);
			setItems(data);
			setLoading(false);
		};

		fetchCartItems();
	}, []);

	const incrementCount = async (item: CartItem) => {
		const user = auth.currentUser;
		if (!user) return;

		const newCount = item.count + 1;

		await updateDoc(
			doc(db, "customers", user.email || "", "cart", item.itemName),
			{ count: newCount }
		);

		setItems((prev) =>
			prev.map((i) =>
				i.itemName === item.itemName ? { ...i, count: newCount } : i
			)
		);
	};

	const decrementCount = async (item: CartItem) => {
		const user = auth.currentUser;
		if (!user) return;

		const newCount = item.count - 1;

		if (newCount <= 0) {
			await deleteDoc(
				doc(db, "customers", user.email || "", "cart", item.itemName)
			);
			setItems((prev) =>
				prev.filter((i) => i.itemName !== item.itemName)
			);
		} else {
			await updateDoc(
				doc(db, "customers", user.email || "", "cart", item.itemName),
				{ count: newCount }
			);

			setItems((prev) =>
				prev.map((i) =>
					i.itemName === item.itemName ? { ...i, count: newCount } : i
				)
			);
		}
	};

	const removeItem = async (itemName: string) => {
		const user = auth.currentUser;
		if (!user) return;

		await deleteDoc(
			doc(db, "customers", user.email || "", "cart", itemName)
		)
			.then(() => {
				toast.info("Item removed from cart");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Failed to remove item");
			});
		setItems((prev) => prev.filter((i) => i.itemName !== itemName));
	};

	const placeOrder = () => {
		if (items.length === 0) return toast.error("Cart is empty");
		setOrderPlaced(true);
		toast.info("Order placed. Status: Pending...");
	};

	const cancelOrder = () => {
		setOrderPlaced(false);
		toast.warning("Order canceled.");
	};

	return (
		<div>
			<h1 className="text-2xl font-bold pb-4 pt-6">My Cart</h1>

			{loading ? (
				<p className="text-gray-500">Loading cart items...</p>
			) : items.length === 0 ? (
				<p className="text-gray-500">Your cart is empty.</p>
			) : (
				<>
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

								{orderPlaced ? (
									<div className="mt-4 text-sm text-yellow-600 font-semibold">
										<Loader2 className="animate-spin mr-2" />
										Status: Pending...
									</div>
								) : (
									<div className="flex justify-between mt-4 items-center">
										<div className="flex items-center gap-2">
											<Button
												variant="outline"
												size="icon"
												onClick={() =>
													decrementCount(item)
												}
											>
												<Minus />
											</Button>
											<span className="text-sm">
												{item.count}
											</span>
											<Button
												variant="outline"
												size="icon"
												onClick={() =>
													incrementCount(item)
												}
											>
												<Plus />
											</Button>
										</div>
										<Button
											variant="secondary"
											size="icon"
											onClick={() =>
												removeItem(item.itemName)
											}
										>
											<Trash2 />
										</Button>
									</div>
								)}
							</div>
						))}
					</div>

					<div className="mt-8">
						{orderPlaced ? (
							<Button
								variant="outline"
								onClick={cancelOrder}
								className="w-full"
							>
								Cancel Order
							</Button>
						) : (
							<Button
								variant="secondary"
								onClick={placeOrder}
								className="w-full flex items-center gap-2"
							>
								<ShoppingCart />
								Place Order
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
}
