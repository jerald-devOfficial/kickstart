import PropTypes from "prop-types";
import { Card } from "./ui/card";

const Campaigns = ({ campaign }) => {
  return <Card className="w-fit px-4 py-2">{campaign}</Card>;
};

Campaigns.propTypes = {
  campaign: PropTypes.string.isRequired,
};

export default Campaigns;
