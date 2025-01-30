import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function NoUserView() {
	return (
		<div className="flex flex-col items-center gap-4 h-screen justify-center">
			<ShoppingBag size={64} className="text-purple-500" />
			<p>Please sign in or sign up to get started.</p>
			<div className="flex gap-4">
				<Button>
					<Link href="/sign_in">Sign in</Link>
				</Button>
				<Button variant="secondary">
					<Link href="/sign_up">Sign up</Link>
				</Button>
			</div>
		</div>
	);
}
