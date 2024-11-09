import dotenv from "dotenv";
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

dotenv.config({ path: ".env.local" });

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.FACTORY_ADDRESS
);

export default instance;
