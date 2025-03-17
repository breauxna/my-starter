import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { SearchInput } from "../common/SearchInput";
import { CloseOnNavigation } from "./CloseOnNavigation";

export function MobileMenu() {
  return (
    <Popover className="group">
			<PopoverButton 
        className="flex items-center justify-center w-8 h-8 rounded focus:outline-none" 
        aria-label="Toggle Mobile Menu"
      >
				<EllipsisVerticalIcon className="h-5 w-5 group-data-[open]:hidden" />
				<XMarkIcon className="h-5 w-5 hidden group-data-[open]:block" />
			</PopoverButton>
      <CloseOnNavigation />
			<PopoverPanel className="fixed left-0 top-24 bg-white w-screen h-screen px-5 py-8 z-20">
        <nav className="flex flex-col items-center gap-6">
          <SearchInput />
        </nav>
			</PopoverPanel>
		</Popover>
  );
}