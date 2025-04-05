import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export default function CompanyInventoryView(props: { company_name: string }) {
	return (
		<div className="flex flex-col gap-4 mt-2">
			<h2 className="text-2xl text-gray-500 font-semibold">Inventory</h2>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<h4 className="text-lg font-semibold">Shoes</h4>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<Card key={i}>
								<img
									src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
									alt="Product Image"
									className="object-cover md:object-scale-down h-20 mx-auto"
								/>
								<CardHeader>
									<CardTitle>Air jordan</CardTitle>
									<CardDescription>$50.00</CardDescription>
								</CardHeader>
								<CardFooter>
									<div className="flex justify-between w-full">
										<Button
											variant="secondary"
											disabled
											onClick={() => alert("Edit item")}
										>
											<Pen />
										</Button>
										<Button
											variant="outline"
											onClick={() => alert("Delete item")}
										>
											<Trash />
										</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h4 className="text-lg font-semibold">Shirts</h4>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<Card key={i}>
								<img
									src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hpcnRzfGVufDB8fDB8fHww"
									alt="Product Image"
									className="object-cover md:object-scale-down h-20 mx-auto"
								/>
								<CardHeader>
									<CardTitle>Air jordan</CardTitle>
									<CardDescription>$50.00</CardDescription>
								</CardHeader>
								<CardFooter>
									<div className="flex justify-between w-full">
										<Button
											variant="secondary"
											disabled
											onClick={() => alert("Edit item")}
										>
											<Pen />
										</Button>
										<Button
											variant="outline"
											onClick={() => alert("Delete item")}
										>
											<Trash />
										</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
