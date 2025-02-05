"use client";

import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { NavLocation } from "./nav-location";
import Link from "next/link";

export function SiteHeader() {
	const { toggleSidebar } = useSidebar();

	return (
		<header className="fle sticky top-0 z-50 w-full items-center border-b bg-white dark:bg-neutral-950">
			<div className="flex h-full w-full items-center gap-2 p-2 justify-between">
				<div className="flex items-center gap-2">
					<Button
						className="h-8 w-8"
						variant="ghost"
						size="icon"
						onClick={toggleSidebar}
					>
						<SidebarIcon size="xl" />
					</Button>
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Link
						href="/"
						className="md:text-2xl text-xl font-light font-serif"
					>
						Fit{" "}
						<span className="font-semibold font-sans not-italic ">
							Finder
						</span>
					</Link>
				</div>
				<div>
					<NavLocation />
				</div>
			</div>
		</header>
	);
}
