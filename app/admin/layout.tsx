import LogoutButton from "../components/LogoutButton";
import NavBar from "./components/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[22rem] md:w-[40rem] lg:w-[60rem] lg:p-6 xl:w-[80rem] flex flex-col gap-4">
      <header>
        <div className="mb-5 flex flex-col items-center justify-between md:mb-10 md:flex-row">
          <div>
            <h1 className="text-center text-3xl text-gray-800 lg:text-5xl">
              Admin Panel
            </h1>
            <p className="text-center text-gray-700 md:text-left">
              Updated at: {new Date().toLocaleString("en-uk")}
            </p>
          </div>
          <div className="my-3 flex flex-col gap-5">
            <LogoutButton />
          </div>
        </div>
        <NavBar />
      </header>
      {children}
    </div>
  );
}
