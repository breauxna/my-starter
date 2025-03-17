import { Outlet } from "react-router";
import { Header } from "../navigation/Header";

export function Home() {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}