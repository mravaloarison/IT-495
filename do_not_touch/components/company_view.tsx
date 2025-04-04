"use client";

import { Image, Pen, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import AlertLocation from "./alert_location";

export default function CompanyView(props: { user: string }) {
	const [isChangingLocation, setIsChangingLocation] = useState(false);
	const [location, setLocation] = useState("123 Main St, City, State, 10801");

	return (
		<div className="">
			<div className="flex flex-col gap-4">
				<div className="flex gap-2 items-center text-gray-500">
					<div className="rounded-full border flex items-center justify-center">
						<Image className="m-2" />
					</div>
					<h1 className="text-2xl font-semibold underline">
						Company Name
					</h1>
					<div className="p-2 w-8 h-8 flex items-center justify-center">
						<Pen />
					</div>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					<Card>
						<CardContent>
							<h2 className="text-lg font-semibold">
								Current location
							</h2>
							<p className="text-gray-500">{location}</p>
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
					<Button variant="secondary" className="h-full">
						<Plus />
						Add more to your inventroy
					</Button>
				</div>
				<div></div>
			</div>
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
		</div>
	);
}
