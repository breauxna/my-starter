import { useClose } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function CloseOnNavigation() {
  const pathname = useNavigate();
	const searchParams = useSearchParams();
	const close = useClose();

	useEffect(() => {
		close();
	}, [pathname, searchParams, close]);

  return null;
}