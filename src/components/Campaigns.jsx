import PropTypes from "prop-types";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const Campaigns = ({ campaign }) => {
  return (
    <Card className="w-fit p-4 flex flex-col gap-y-2">
      <CardTitle>{campaign}</CardTitle>
      <CardDescription>
        <Link
          href={`/campaigns/${campaign}`}
          className="text-blue-500 font-semibold"
        >
          View Campaign
        </Link>
      </CardDescription>
    </Card>
  );
};

Campaigns.propTypes = {
  campaign: PropTypes.string.isRequired,
};

export default Campaigns;
