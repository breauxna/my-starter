import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useCallback, useState } from "react"
import { useNavigate, useSearchParams } from "react-router";

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearch = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
    navigate({pathname: '/', search: params.toString()});
  }, [navigate, query, setSearchParams]);


  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSearch}>   
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5"/>
        </div>
        <input 
          type="search"
          name="search" 
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products"
        />
      </div>
    </form>
  )
}