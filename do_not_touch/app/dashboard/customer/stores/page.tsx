"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase_utils";
import CompanyCard from "@/components/company_card";

type Company = {
	companyName: string;
	logoURL: string;
	location: string;
	email: string;
};

type InventoryItem = {
	itemName: string;
	price: number;
	picURL: string;
};

export default function Page() {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [activeCompany, setActiveCompany] = useState<Company | null>(null);
	const [inventory, setInventory] = useState<InventoryItem[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCompanies = async () => {
			const companiesRef = collection(db, "companies");
			const snapshot = await getDocs(companiesRef);

			const data: Company[] = snapshot.docs.map((doc) => {
				const d = doc.data();
				return {
					companyName: d.companyName,
					logoURL: d.logoURL || "/placeholder.png",
					location: d.location,
					email: doc.id,
				};
			});

			setCompanies(data);
		};

		fetchCompanies();
	}, []);

	const fetchInventory = async (company: Company) => {
		setLoading(true);
		const inventoryRef = collection(
			db,
			"companies",
			company.email,
			"inventory"
		);
		const snapshot = await getDocs(inventoryRef);

		const allItems: InventoryItem[] = [];

		snapshot.forEach((doc) => {
			const data = doc.data();
			Object.entries(data).forEach(([itemName, value]: any) => {
				allItems.push({
					itemName,
					price: value.price,
					picURL: value.picURL,
				});
			});
		});

		setInventory(allItems);
		setActiveCompany(company);
		setLoading(false);
	};

	return (
		<div>
			<h1 className="text-2xl font-bold pb-4 pt-6">Stores</h1>
			{activeCompany ? (
				<CompanyCard
					{...activeCompany}
					items={inventory}
					isLoading={loading}
					onBack={() => setActiveCompany(null)}
				/>
			) : (
				<div className="md:grid md:grid-cols-3 flex flex-col items-center gap-4 p-4">
					{companies.map((company, i) => (
						<CompanyCard
							key={i}
							{...company}
							onView={() => fetchInventory(company)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
