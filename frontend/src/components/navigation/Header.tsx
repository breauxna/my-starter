import { Link } from "react-router";
import { SearchInput } from "../common/SearchInput";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 w-full bg-white mb-12">
      <nav className="w-full max-w-screen-xl mx-auto px-5 h-14 md:h-[4.5rem] flex justify-between gap-4 items-center border-b border-zinc-800 md:border-transparent">
				<Link to={'/'} rel="noreferrer" aria-label="home">
          <span className="p-3 font-bold">EverAvenue</span>
				</Link>
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <div className="flex items-center sm:hidden gap-2 -mr-2">
					<MobileMenu />
				</div>
      </nav>
    </header>
  );
}
