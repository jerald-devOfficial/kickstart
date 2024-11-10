import factory from "@/factory";
import Campaigns from "@/components/Campaigns";
import { LuPlusCircle } from "react-icons/lu";
import { Suspense } from "react";
import Link from "next/link";

const Home = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return (
    <div className="flex flex-col flex-grow">
      <div className="w-4/5 flex flex-col gap-y-5 items-start">
        <Suspense fallback={<div>Loading...</div>}>
          {campaigns.map((campaign) => (
            <Campaigns key={campaign} campaign={campaign} />
          ))}
        </Suspense>
        <Link
          href="/campaigns/new"
          className="flex gap-x-2 items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <LuPlusCircle size={20} />
          <span className="text-sm">Create Campaign</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
