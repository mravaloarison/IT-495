"use client";

import { useEffect, useRef } from "react";
import NewCompanyView from "@/components/new_company";
import NewCustomerView from "@/components/new_cusomer";
import NewDriverView from "@/components/new_driver";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Page() {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			gsap.fromTo(
				containerRef.current,
				{ opacity: 0, x: 50 },
				{ opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	const handleBack = () => {
		if (containerRef.current) {
			gsap.to(containerRef.current, {
				opacity: 0,
				x: -10,
				duration: 0.5,
				ease: "power2.in",
				onComplete: () => {
					router.replace("/no_user");
					router.refresh();
				},
			});
		}
	};

	return (
		<div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 md:p-6">
			<div
				ref={containerRef}
				className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md"
			>
				<h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
					Create Your FitFinder Account
				</h1>
				<p className="text-center text-gray-500 mb-6">
					Choose your role to get started
				</p>

				<Tabs defaultValue="customer" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-6">
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
						className="w-full mt-6 flex items-center gap-2 justify-center"
						onClick={handleBack}
					>
						<ArrowLeft className="w-4 h-4" />
						Go back
					</Button>
				</Tabs>
			</div>
		</div>
	);
}
