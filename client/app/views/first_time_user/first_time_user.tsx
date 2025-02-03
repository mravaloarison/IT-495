import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ContactInfromationView from "./contact_information";
import AccountTypeView from "./account_type";

interface FirstTimeUserProps {
	emailAdrress: string | null;
	accountTypeCallback: (value: boolean) => void;
	contactInformationCallback: (value: boolean) => void;
}

export default function FirstTimeUser({
	emailAdrress,
	accountTypeCallback,
	contactInformationCallback,
}: FirstTimeUserProps) {
	return (
		<Carousel className="w-full max-w-xs mx-auto">
			<CarouselContent>
				<ContactInfromationView
					emailAdrress={emailAdrress}
					onUpdate={contactInformationCallback}
				/>
				<AccountTypeView onUpdate={accountTypeCallback} />
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
