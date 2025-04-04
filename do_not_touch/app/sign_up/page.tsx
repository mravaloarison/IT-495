"use client";

import NewCompanyView from "@/components/new_company";
import NewCustomerView from "@/components/new_cusomer";
import NewDriverView from "@/components/new_driver";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	return (
		<div className="h-screen">
			<div>
				<h1 className="text-3xl font-bold text-gray-500 text-center pt-6 pb-2">
					Sign up
				</h1>
			</div>
			<Tabs defaultValue="customer" className="max-w-xl mx-auto px-6">
				<TabsList className="grid w-full grid-cols-3 my-6">
					<TabsTrigger value="customer">Customer</TabsTrigger>
					<TabsTrigger value="company">Company</TabsTrigger>
					<TabsTrigger value="driver">Driver</TabsTrigger>
				</TabsList>
				<TabsContent value="customer">
					<NewCustomerView />
				</TabsContent>
				<TabsContent value="company">
					<NewCompanyView />
				</TabsContent>
				<TabsContent value="driver">
					<NewDriverView />
				</TabsContent>
				<Button
					variant="secondary"
					className="hover:cursor-pointer my-6"
					onClick={() => {
						router.replace("/no_user");
						router.refresh();
					}}
				>
					<ArrowLeft />
					Go back
				</Button>
			</Tabs>
		</div>
	);
}
