import factory from "../../ethereum/factory";
import Campaigns from "@/components/Campaigns";
import { Button } from "@/components/ui/button";
import { LuPlusCircle } from "react-icons/lu";
import { Suspense } from "react";
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
        <Button className="flex gap-x-2 items-center justify-center">
          <LuPlusCircle size={20} />
          <span className="text-sm">Create Campaign</span>
        </Button>
      </div>
    </div>
  );
};

export default Home;
