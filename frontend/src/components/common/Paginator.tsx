import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/16/solid";
import { useSearchParams } from "react-router";

type PaginatorProps = {
  totalPageCount: number;
}

export function Paginator({ totalPageCount }: PaginatorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curPage = Number(searchParams.get('page') || 1);

  const handleNextPage = () => {
    setSearchParams((params) =>{
      params.set('page', (curPage + 1).toString());
      return params;
    });
  }

  const handlePrevPage = () => {
    setSearchParams((params) =>{
      params.set('page', (curPage - 1).toString());
      return params;
    });
  }

  return  (
    <div className="flex items-center gap-8">
      <button 
        aria-label="Previous Page"
        disabled={curPage <= 1} 
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
        onClick={handlePrevPage}
      >
        <ArrowLongLeftIcon className="h-5 w-5" />
      </button>
    
      <p className="text-slate-600">
        Page <strong className="text-slate-800">{curPage}</strong> of&nbsp;<strong className="text-slate-800">{totalPageCount}</strong>
      </p>
      
      <button 
        aria-label="Next Page"
        disabled={curPage >= totalPageCount} 
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
        onClick={handleNextPage}
      >
        <ArrowLongRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}