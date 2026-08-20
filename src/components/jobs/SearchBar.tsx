import { Search, MapPin } from "lucide-react";

const CITY_OPTIONS = [
    "All locations",
    "Rawalpindi",
    "Islamabad",
    "Karachi",
    "Lahore",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Remote",
];

interface SearchBarProps {
    query: string;
    selectedCity: string;
    setQuery: (query: string) => void;
    setSelectedCity: (city: string) => void;
    handleSearch: () => void;
}

const SearchBar = ({ handleSearch, query, setQuery, selectedCity, setSelectedCity }: SearchBarProps) => {
    return (
        <div className="w-full sticky top-20 z-30">
            <div className="w-full max-w-7xl px-4 sm:px-8 mx-auto">
                <div className="flex w-full flex-col sm:flex-row gap-3 bg-white border border-slate-200 rounded-xl p-3 mt-5">
                    {/* Search input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search by job title, company, or skill..."
                            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Location filter */}
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="appearance-none w-full sm:w-52 rounded-lg border border-slate-200 pl-10 pr-8 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors cursor-pointer"
                        >
                            {CITY_OPTIONS.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shrink-0"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
