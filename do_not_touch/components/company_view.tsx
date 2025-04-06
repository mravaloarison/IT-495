"use client";

import { Image, MapPin, Pen, Plus, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import AlertLocation from "./alert_location";
import CompanyInventoryView from "./company_inventory";
import AlertAddToInventory from "./alert_add_to_inventory";
import AlertUpdatePersonalInfo from "./alert_to_update_PI";

export default function CompanyView(props: { user: string }) {
	const [isChangingLocation, setIsChangingLocation] = useState(false);
	const [location, setLocation] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [isAddingToInventoryOpen, setIsAddingToInventoryOpen] =
		useState(false);
	const [isUpdatingCompanyDetailsOpen, setIsUpdatingCompanyDetailsOpen] =
		useState(false);

	return (
		<div className="">
			<div className="flex flex-col gap-4">
				<Button
					variant="link"
					className="flex gap-2 items-center text-gray-500 hover:cursor-pointer w-fit"
					onClick={() => setIsUpdatingCompanyDetailsOpen(true)}
				>
					<div className="rounded-full border flex items-center justify-center">
						<Image className="m-2" />
					</div>
					<h1 className="text-2xl font-semibold underline">
						Company Name
					</h1>
					<div className="p-2 w-8 h-8 flex items-center justify-center">
						<Pen />
					</div>
				</Button>
				<div className="grid md:grid-cols-2 gap-4">
					<Card>
						<CardContent>
							<h2 className="text-lg font-semibold">
								Current location
							</h2>
							{location === "" ? (
								<div className="text-yellow-500 p-2 flex gap-2 items-center">
									<TriangleAlert />
									No location set
								</div>
							) : (
								<div className="text-gray-500 p-2 flex gap-2 items-center truncate">
									<MapPin />
									{location}
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button
								variant="outline"
								onClick={() => setIsChangingLocation(true)}
							>
								Change location
							</Button>
						</CardFooter>
					</Card>
					<Button
						variant="secondary"
						className="h-full hover:cursor-pointer"
						onClick={() => setIsAddingToInventoryOpen(true)}
					>
						<Plus />
						Add more to your inventroy
					</Button>
				</div>
				<div></div>
			</div>

			<CompanyInventoryView company_name={companyName} />

			<AlertLocation
				user={props.user}
				isOpen={isChangingLocation}
				curentLocation={location}
				callback={(newLocation) => {
					setLocation(newLocation);
					console.log("New location: ", newLocation);
					console.log(isChangingLocation);
					setIsChangingLocation(false);
				}}
			/>

			<AlertAddToInventory
				isOpen={isAddingToInventoryOpen}
				onOpenChange={setIsAddingToInventoryOpen}
				onConfirm={(item) => {
					console.log("Item added to inventory: ", item);
					setIsAddingToInventoryOpen(false);
				}}
			/>

			<AlertUpdatePersonalInfo
				isOpen={isUpdatingCompanyDetailsOpen}
				user={props.user}
				onOpenChange={setIsUpdatingCompanyDetailsOpen}
				onConfirm={(companyName, location) => {
					setCompanyName(companyName);
					setLocation(location);
					console.log("Company name: ", companyName);
					console.log("Location: ", location);
					setIsUpdatingCompanyDetailsOpen(false);
				}}
			/>
		</div>
	);
}
