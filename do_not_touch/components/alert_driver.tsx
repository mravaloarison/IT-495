import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive() {
	return (
		<Alert variant="destructive">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Hey there</AlertTitle>
			<AlertDescription>
				This option is not available yet. Please check back later.
			</AlertDescription>
		</Alert>
	);
}
