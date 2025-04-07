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

type Item = {
	price: number;
	picURL: string;
};

export default function CompanyInventoryView(props: {
	company_name: string;
	user: string;
}) {
	const [inventory, setInventory] = useState<
		Record<string, Record<string, Item>>
	>({});

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
													disabled
													onClick={() =>
														alert("Edit item")
													}
												>
													<Pen />
												</Button>
												<Button
													variant="outline"
													disabled
													onClick={() =>
														alert("Delete item")
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
		</div>
	);
}
