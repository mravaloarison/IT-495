"use client";

import { Button } from "./ui/button";
import { ArrowLeft, Eye, Heart, ShoppingBag } from "lucide-react";

type InventoryItem = {
	itemName: string;
	price: number;
	picURL: string;
};

type CompanyCardProps = {
	logoURL: string;
	companyName: string;
	location: string;
	email: string;
	onView?: () => void;
	onBack?: () => void;
	items?: InventoryItem[];
	isLoading?: boolean;
};

export default function CompanyCard({
	logoURL,
	companyName,
	location,
	onView,
	onBack,
	items = [],
	isLoading = false,
}: CompanyCardProps) {
	const isActive = typeof onBack === "function";

	if (!isActive) {
		return (
			<div className="border p-4 rounded-md shadow-sm w-full">
				<img
					src={logoURL}
					alt={`${companyName} logo`}
					className="w-24 h-24 object-cover mx-auto mb-2 rounded-full"
				/>
				<h2 className="text-xl font-bold text-center">{companyName}</h2>
				<p className="text-sm text-center text-gray-500">{location}</p>
				<Button
					onClick={onView}
					variant="secondary"
					className="w-full mt-4"
				>
					<Eye className="mr-2" />
					View Items
				</Button>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex items-center gap-4 mb-6">
				<img
					src={logoURL}
					alt={companyName}
					className="w-20 h-20 object-cover rounded"
				/>
				<div>
					<h2 className="text-2xl font-bold">{companyName}</h2>
					<p className="text-sm text-gray-500">{location}</p>
				</div>
			</div>

			<div className="my-6">
				<Button onClick={onBack} variant="secondary" className="w-full">
					<ArrowLeft className="mr-2" />
					Go back
				</Button>
			</div>

			{isLoading ? (
				<p>Loading inventory...</p>
			) : items.length === 0 ? (
				<p className="text-gray-500">This store has no items listed.</p>
			) : (
				<div className="md:grid md:grid-cols-3 flex flex-col gap-4">
					{items.map((item) => (
						<div
							key={item.picURL}
							className="border rounded p-3 text-sm shadow-sm"
						>
							<img
								src={item.picURL}
								alt={item.itemName}
								className="h-46  w-full object-cover rounded mb-2"
							/>
							<p className="font-medium">{item.itemName}</p>
							<p className="text-gray-600">${item.price}</p>
							<div className="flex justify-between mt-4">
								<Button variant="outline" disabled>
									<Heart />
									Save
								</Button>
								<Button variant="secondary" disabled>
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
