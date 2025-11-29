import { EXPO_PUBLIC_API_KEY } from "@/config";

export const TBMD_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    Headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + EXPO_PUBLIC_API_KEY
    }
}

export const fetchPopularMovies = async ({ query }: { query: string }) => {
    console.log(TBMD_CONFIG.Headers)
    const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}` :
        '/discover/movie?sort_by=popularity.desc';
    try {
        const response = await fetch(`${TBMD_CONFIG.BASE_URL}${endpoint}`, {
            method: "GET",
            headers: TBMD_CONFIG.Headers,
        });

        const data = await response.json();
        console.log("Fetched movies data:", data);
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}