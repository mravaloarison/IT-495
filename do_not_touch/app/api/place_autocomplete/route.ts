export async function POST(request: Request) {
    const formData = await request.formData();
    const searchQuery = formData.get("search") as string;

    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const GOOGLE_PLACES_URL = "https://places.googleapis.com/v1/places:searchText";

    try {
        const response = await fetch(GOOGLE_PLACES_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": API_KEY || "",
                "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.id",
            },
            body: JSON.stringify({ textQuery: searchQuery, pageSize: 3 }),
        });
        
        const data = await response.json();
        return Response.json(data);
    } catch (error: any) {
        return Response.json({ message: error.message });
    }
}