"use client";

import { Button } from "@/components/ui/button";
import { Home, Save, ShoppingBag, Store } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function CustomerNavView() {
	const router = useRouter();
	const pathname = usePathname();

	const menus = [
		{ name: "Home", icon: <Home />, link: "/dashboard" },
		{ name: "Stores", icon: <Store />, link: "/dashboard/customer/stores" },
		{ name: "Saved", icon: <Save />, link: "/dashboard/customer/payments" },
		{
			name: "My cart",
			icon: <ShoppingBag />,
			link: "/dashboard/customer/orders",
		},
	];

	return (
		<ul className="flex justify-between items-center gap-2 text-gray-500 border-b border-gray-200 pb-4">
			{menus.map((menu, index) => {
				const isActive = pathname === menu.link;

				return (
					<Button
						key={index}
						variant="link"
						size="sm"
						className={clsx(
							"hover:cursor-pointer flex flex-col items-center md:flex-row gap-1 transition-all",
							isActive &&
								"text-indigo-500 font-semibold underline underline-offset-4"
						)}
						onClick={() => router.push(menu.link)}
					>
						{menu.icon}
						<span>{menu.name}</span>
					</Button>
				);
			})}
		</ul>
	);
}
