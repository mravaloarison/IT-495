"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase_utils";
import CompanyCard from "@/components/company_card";

type Company = {
	companyName: string;
	logoURL: string;
	location: string;
};

export default function Page() {
	const [companies, setCompanies] = useState<Company[]>([]);

	useEffect(() => {
		const fetchCompanies = async () => {
			const companiesRef = collection(db, "companies");
			const snapshot = await getDocs(companiesRef);

			console.log(snapshot);

			const data: Company[] = snapshot.docs.map((doc) => {
				const d = doc.data();
				return {
					companyName: d.companyName,
					logoURL: d.logoURL || "/placeholder.png",
					location: d.location,
				};
			});

			setCompanies(data);
		};

		fetchCompanies();
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold pb-4 pt-6">Stores</h1>
			<div className="md:grid md:grid-cols-3 flex flex-col items-center gap-4 p-4">
				{companies.map((company, i) => (
					<CompanyCard
						key={i}
						logoURL={company.logoURL}
						companyName={company.companyName}
						location={company.location}
					/>
				))}
			</div>
		</div>
	);
}
