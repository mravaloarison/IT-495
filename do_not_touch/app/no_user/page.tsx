import { Button } from "@/components/ui/button";
import { AlertOctagon } from "lucide-react";
import Link from "next/link";

export default function NoUser() {
	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center gap-6 justify-center max-w-lg w-full">
				<AlertOctagon className="h-16 w-16 text-gray-500" />
				<div className="text-2xl font-semibold text-center text-gray-500">
					You are not signed in. Please sign in or create an account
					to continue.
				</div>
				<Button asChild className="w-full">
					<Link href="/sign_in" className="w-full">
						Sign in
					</Link>
				</Button>
				<Button asChild className="w-full" variant="secondary">
					<Link href="/sign_up" className="w-full">
						Sign up
					</Link>
				</Button>
			</div>
		</div>
	);
}
