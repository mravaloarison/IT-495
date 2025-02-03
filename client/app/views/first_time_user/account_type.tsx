import { CarouselItem } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Store, Truck, SquareUserRoundIcon } from "lucide-react";

interface AccountTypeViewProps {
	onUpdate: (value: boolean) => void;
}

export default function AccountTypeView({ onUpdate }: AccountTypeViewProps) {
	const accountTypes = [
		{
			name: "Customer",
			description: "Designed for customers who want to purchase items.",
			icon: <SquareUserRoundIcon className="text-orange-500" />,
		},
		{
			name: "Driver",
			description: "Designed for drivers who want to deliver items.",
			icon: <Truck className="text-blue-500" />,
		},
		{
			name: "Store",
			description: "Designed for stores that want to sell items.",
			icon: <Store className="text-green-500" />,
		},
	];

	const RadioValueChanged = (value: string) => {
		localStorage.setItem("accountType", value);
		onUpdate(true);
	};

	return (
		<CarouselItem>
			<div className="w-full p-2 pb-4 flex flex-col gap-6">
				<p className="font-semibold text-lg text-center">
					Account type
				</p>
				<RadioGroup
					onValueChange={RadioValueChanged}
					className="flex flex-col gap-6"
				>
					{accountTypes.map((accountType) => (
						<div
							key={accountType.name}
							className="flex items-start space-x-4"
						>
							<RadioGroupItem
								value={accountType.name.toLowerCase()}
								id={accountType.name}
							/>
							{accountType.icon}
							<Label htmlFor={accountType.name}>
								<div className="flex flex-col gap-2 text-md">
									<p className="font-semibold">
										{accountType.name}
									</p>
									<p className="text-slate-400">
										{accountType.description}
									</p>
								</div>
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</CarouselItem>
	);
}
