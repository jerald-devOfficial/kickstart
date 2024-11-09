import { LuPlusCircle } from "react-icons/lu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between border items-center pl-4 rounded-lg shadow-sm h-16">
      <Link href="/" className="text-2xl font-bold">
        KickStart
      </Link>
      <div className="flex items-center h-16 overflow-hidden">
        <Link
          href="/campaigns"
          className="text-lg font-medium hover:bg-green-200 hover:border-green-200 border-x rounded-none text-slate-800 hover:text-green-600 px-2 py-[18px]"
        >
          Campaigns
        </Link>
        <Link
          href="/campaigns/new"
          className="hover:bg-green-200 rounded-none size-16 flex items-center justify-center hover:text-green-600 hover:rounded-r-lg"
        >
          <LuPlusCircle size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
