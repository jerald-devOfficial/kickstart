const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3').default;
const compiledFactory = require('./build/CampaignFactory.json');

// showing this but not actually working
const dotenv = require('dotenv');
dotenv.config({ path: ".env.local" });

// unfortunatley, this is not working if you use .env variables, so please use the hardcoded values below
const provider = new HDWalletProvider(
  process.env.METAMAST_MNEMONIC,
  `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
