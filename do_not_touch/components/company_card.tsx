import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link2 } from "lucide-react";

interface CompanyCardProps {
	logoURL: string;
	companyName: string;
	location: string;
}

export default function CompanyCard({
	logoURL,
	companyName,
	location,
}: CompanyCardProps) {
	return (
		<Card className="w-full max-w-xs hover:shadow-md transition-shadow">
			<CardHeader className="flex items-center justify-center">
				<img
					src={logoURL}
					alt={companyName}
					className="w-24 h-24 object-contain rounded-full border"
				/>
			</CardHeader>
			<CardContent className="text-center">
				<CardTitle className="text-lg">{companyName}</CardTitle>
				<p className="text-sm text-muted-foreground">{location}</p>
			</CardContent>
			<CardFooter>
				<Button className="w-full" variant="secondary">
					<Link2 />
					Visit
				</Button>
			</CardFooter>
		</Card>
	);
}
