import { Home, ShoppingBag, Store, WalletCards } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import AlertLocation from "./alert_location";
// import { Plus } from "lucide-react";
import { Image, MapPin, Pen, TriangleAlert } from "lucide-react";
import AlertUpdatePersonalInfo from "./alert_to_update_PI";
import AIChatPage from "./chat_box";

export default function CustomerView(props: { user: string }) {
	const [isChangingLocation, setIsChangingLocation] = useState(false);
	const [location, setLocation] = useState("");
	const [isUpdatingPersonalInfo, setIsUpdatingPersonalInfo] = useState(false);
	const [userName, setUserName] = useState("");
	const [userPicURL, setUserPicURL] = useState("");

	return (
		<div>
			<ul className="flex justify-between items-center gap-6 text-gray-500 border-b border-gray-200 pb-4">
				<Button variant="link" className="hover:cursor-pointer">
					<Home />
					Home
				</Button>
				<Button variant="link" className="hover:cursor-pointer">
					<Store />
					Stores
				</Button>
				<Button variant="link" className="hover:cursor-pointer">
					<ShoppingBag />
					Orders
				</Button>
				<Button variant="link" className="hover:cursor-pointer">
					<WalletCards />
					Payments
				</Button>
			</ul>

			<div className="py-4">
				<div className="flex flex-col gap-4">
					<Button
						variant="link"
						className="flex gap-2 items-center text-gray-500 hover:cursor-pointer w-fit"
						onClick={() => setIsUpdatingPersonalInfo(true)}
					>
						<div className="rounded-full border flex items-center justify-center">
							<Image className="m-2" />
						</div>
						<h1 className="text-2xl font-semibold underline">
							Full name
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
					</div>
				</div>
				<div className="flex flex-col items-center gap-2 mt-4">
					<AIChatPage />
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

				<AlertUpdatePersonalInfo
					isOpen={isUpdatingPersonalInfo}
					user={props.user}
					onOpenChange={setIsUpdatingPersonalInfo}
					onConfirm={(name: string, logoURL: string) => {
						setUserName(name);
						setUserPicURL(logoURL);
						console.log("New name: ", name);
						console.log("New logo URL: ", logoURL);
					}}
				/>
			</div>
		</div>
	);
}
