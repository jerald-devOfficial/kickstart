import PropTypes from "prop-types";

const Campaign = async ({ params }) => {
  const { campaign } = await params;
  return (
    <div className="flex flex-col">
      <h1>{campaign}</h1>
    </div>
  );
};

export default Campaign;

Campaign.propTypes = {
  params: PropTypes.shape({
    campaign: PropTypes.string.isRequired,
  }).isRequired,
};
