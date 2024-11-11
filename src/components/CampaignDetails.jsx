import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropTypes from "prop-types";

const CampaignDetails = ({ header, meta, description }) => {
  return (
    <Card className="w-full col-span-1">
      <CardHeader>
        <CardTitle className="break-words">{header}</CardTitle>
        <CardDescription>{meta}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
};

CampaignDetails.propTypes = {
  header: PropTypes.string.isRequired,
  meta: PropTypes.string,
  description: PropTypes.string,
};

export default CampaignDetails;
