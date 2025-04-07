"use client";

import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Store, WalletCards } from "lucide-react";

export default function CustomerNavView() {
	const menus = [
		{ name: "Home", icon: <Home />, link: "/dashboard" },
		{ name: "Stores", icon: <Store />, link: "/dashboard/customer/stores" },
		{
			name: "Orders",
			icon: <ShoppingBag />,
			link: "/dashboard/customer/orders",
		},
		{
			name: "Payments",
			icon: <WalletCards />,
			link: "/dashboard/customer/payments",
		},
	];
	return (
		<ul className="flex justify-between items-center gap-2 text-gray-500 border-b border-gray-200 pb-4">
			{menus.map((menu, index) => (
				<Button
					key={index}
					variant="link"
					className="hover:cursor-pointer flex flex-col gap-2 md:flex-row md:gap-2"
					size="sm"
					onClick={() => {
						window.location.href = menu.link;
					}}
				>
					{menu.icon}
					{menu.name}
				</Button>
			))}
		</ul>
	);
}
