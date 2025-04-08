import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import AlertLocation from "./alert_location";
import { Image, MapPin, Pen, TriangleAlert } from "lucide-react";
import AlertUpdatePersonalInfo from "./alert_to_update_PI";
import AIChatPage from "./chat_box";
import {
	getCustomerFromDB,
	updateLocation,
	updateNameAndLogo,
} from "@/app/firebase_utils";
import AlertError from "./alert_error";
import CustomerNavView from "./customer_nav";

export default function CustomerView(props: { user: string }) {
	const [isChangingLocation, setIsChangingLocation] = useState(false);
	const [location, setLocation] = useState("");
	const [isUpdatingPersonalInfo, setIsUpdatingPersonalInfo] = useState(false);
	const [userName, setUserName] = useState("");
	const [userPicURL, setUserPicURL] = useState("/");
	const [error, setError] = useState("");
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getCustomerFromDB(props.user)
			.then((data: any) => {
				if (data) {
					setUserName(data.fullName);
				}

				if (data.location) {
					setLocation(data.location);
				}

				if (data.logoURL) {
					setUserPicURL(data.logoURL);
				}
			})
			.catch((error) => {
				console.error("Error fetching customer data: ", error);
				setError("Error fetching customer data");
				setIsError(true);
			});
	}, [props.user]);

	const handleOnChangePersonalInfo = (name: string, logoURL: string) => {
		setUserName(name);
		setUserPicURL(logoURL);

		updateNameAndLogo("customers", props.user, {
			fullName: name,
			logoURL: logoURL,
		});

		setIsUpdatingPersonalInfo(false);
	};

	const handleOnChangeLocation = (newLocation: string) => {
		setLocation(newLocation);

		updateLocation("customers", props.user, newLocation);

		setIsChangingLocation(false);
	};

	return (
		<div>
			<div className="flex flex-col gap-4">
				<CustomerNavView />
				<Button
					variant="link"
					className="flex gap-2 items-center text-gray-500 hover:cursor-pointer w-fit"
					onClick={() => setIsUpdatingPersonalInfo(true)}
				>
					<div className="rounded-full border flex items-center justify-center">
						{userPicURL ? (
							<img
								src={userPicURL}
								alt="Picture"
								className="w-8 h-8 rounded-full object-cover object-center"
							/>
						) : (
							<Image className="m-2" />
						)}
					</div>
					<h1 className="text-2xl font-semibold underline">
						{userName}
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
									{location}
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button
								variant="outline"
								onClick={() => setIsChangingLocation(true)}
							>
								<MapPin />
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
				callback={handleOnChangeLocation}
			/>

			<AlertUpdatePersonalInfo
				isOpen={isUpdatingPersonalInfo}
				user={props.user}
				onOpenChange={setIsUpdatingPersonalInfo}
				onConfirm={handleOnChangePersonalInfo}
			/>

			<AlertError
				isOpen={isError}
				errorMessage={error}
				callback={() => {
					setIsError(false);
				}}
			/>
		</div>
	);
}
