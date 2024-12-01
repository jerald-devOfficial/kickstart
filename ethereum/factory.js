import dotenv from "dotenv"
import CampaignFactory from "./build/CampaignFactory.json"
import web3 from "./web3"

dotenv.config({ path: ".env.local" });

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.abi),
  process.env.CONTRACT_ADDRESS
);

export default instance;
