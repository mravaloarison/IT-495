"use client";

import { ChevronsUpDown, MapPin } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { SearchForm } from "./search-form";
import { Button } from "./ui/button";

export function NavLocation() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="py-6">
							<MapPin className="mr-1.5" />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									434 Main Street
								</span>
								<span className="truncate text-xs">
									New Rocheelle, NY 10801
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
						side="bottom"
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup className="p-2">
							<SearchForm />
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuLabel>
							<div className="flex items-center gap-2">
								<MapPin />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										434 Main Street
									</span>
									<span className="truncate text-xs">
										New Rocheelle, NY 10801
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
