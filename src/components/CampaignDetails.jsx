import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import PropTypes from "prop-types"

const CampaignDetails = ({ header, meta, description, campaign }) => {
  return (
    <Card className="w-full col-span-1">
      <CardHeader>
        <CardTitle className="break-words">{header}</CardTitle>
        <CardDescription>{meta}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <Link href={`/campaigns/${campaign}/requests`}>View Requests</Link>
      </CardFooter>
    </Card>
  );
};

CampaignDetails.propTypes = {
  header: PropTypes.string.isRequired,
  meta: PropTypes.string,
  description: PropTypes.string,
  campaign: PropTypes.string,
};

export default CampaignDetails;
