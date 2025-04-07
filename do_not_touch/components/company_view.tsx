"use client";

import { Image, MapPin, Pen, Plus, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import AlertLocation from "./alert_location";
import CompanyInventoryView from "./company_inventory";
import AlertAddToInventory from "./alert_add_to_inventory";
import AlertUpdatePersonalInfo from "./alert_to_update_PI";
import {
	updateLocation,
	updateNameAndLogo,
	getCompanyFromDB,
	addToCompanyInventoryItem,
} from "@/app/firebase_utils";
import AlertError from "./alert_error";

interface InventoryItem {
	name: string;
	image: string;
	price: number;
	category: string;
}

export default function CompanyView(props: { user: string }) {
	const [isChangingLocation, setIsChangingLocation] = useState(false);
	const [location, setLocation] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [isAddingToInventoryOpen, setIsAddingToInventoryOpen] =
		useState(false);
	const [isUpdatingCompanyDetailsOpen, setIsUpdatingCompanyDetailsOpen] =
		useState(false);
	const [logoURL, setLogoURL] = useState("/");
	const [error, setError] = useState("");
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getCompanyFromDB(props.user)
			.then((data: any) => {
				if (data) {
					setCompanyName(data.companyName);
				}
				if (data.location) {
					setLocation(data.location);
				}

				if (data.logoURL) {
					setLogoURL(data.logoURL);
				}
			})
			.catch((error) => {
				console.error("Error fetching company data: ", error);
			});
	}, [props.user]);

	const handleOnChangePersonalInfo = (
		companyName: string,
		logoURL: string
	) => {
		setCompanyName(companyName);
		setLogoURL(logoURL);

		updateNameAndLogo("companies", props.user, {
			companyName: companyName,
			logoURL: logoURL,
		});

		setIsUpdatingCompanyDetailsOpen(false);
	};

	const handleOnChangeLocation = (newLocation: string) => {
		setLocation(newLocation);

		updateLocation("companies", props.user, newLocation);

		setIsChangingLocation(false);
	};

	const handleOnAddToInventory = (item: InventoryItem) => {
		console.log("Item added to inventory: ", item);

		addToCompanyInventoryItem({
			email: props.user,
			category: item.category,
			itemName: item.name,
			price: item.price,
			picURL: item.image,
		})
			.then(() => {
				console.log("Item added to inventory successfully");
			})
			.catch((error) => {
				console.error("Error adding item to inventory: ", error);
				setError("Error adding item to inventory: " + error);
				setIsError(true);
			});

		setIsAddingToInventoryOpen(false);
	};

	return (
		<div className="">
			<div className="flex flex-col gap-4">
				<Button
					variant="link"
					className="flex gap-2 items-center text-gray-500 hover:cursor-pointer w-fit"
					onClick={() => setIsUpdatingCompanyDetailsOpen(true)}
				>
					<div className="rounded-full border flex items-center justify-center">
						{logoURL ? (
							<img
								src={logoURL}
								alt="Picture"
								className="w-8 h-8 rounded-full object-cover object-center"
							/>
						) : (
							<Image className="m-2" />
						)}
					</div>
					<h1 className="text-2xl font-semibold underline">
						{companyName}
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
								<div className="text-gray-500 p-2 flex gap-2 items-center truncate max-w-72 md:max-w-full">
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

			<CompanyInventoryView
				company_name={companyName}
				user={props.user}
			/>

			<AlertLocation
				user={props.user}
				isOpen={isChangingLocation}
				curentLocation={location}
				callback={handleOnChangeLocation}
			/>

			<AlertAddToInventory
				isOpen={isAddingToInventoryOpen}
				onOpenChange={setIsAddingToInventoryOpen}
				onConfirm={handleOnAddToInventory}
			/>

			<AlertUpdatePersonalInfo
				isOpen={isUpdatingCompanyDetailsOpen}
				user={props.user}
				onOpenChange={setIsUpdatingCompanyDetailsOpen}
				onConfirm={handleOnChangePersonalInfo}
			/>

			<AlertError
				isOpen={isError}
				errorMessage={error}
				callback={() => {
					setIsError(false);
					setError("");
				}}
			/>
		</div>
	);
}
