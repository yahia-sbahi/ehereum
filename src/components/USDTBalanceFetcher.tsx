"use client";
import { useState } from "react";
import { createAlchemyWeb3, AlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
const USDTBalanceFetcher = () => {
  // Define the USDT contract address and ABI
  const USDT_CONTRACT = `${process.env.NEXT_PUBLIC_CONTEAT}`;
  const USDT_ABI: AbiItem[] = [
    {
      constant: true,
      inputs: [{ name: "who", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];

  // Create a contract object
  const web3: AlchemyWeb3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_EHEREUM} `
  );
  const usdt = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT);

  const getUSDTBalance = async (address: string) => {
    try {
      // Call the balanceOf function
      const balance = await usdt.methods.balanceOf(address).call();

      // Call the decimals function
      const decimals = await usdt.methods.decimals().call();

      // Convert the balance from wei to USDT
      const balanceInUsdt = balance / 10 ** decimals;

      // Return the result
      return { address, balance: balanceInUsdt, decimals };
    } catch (error) {
      console.error("Error fetching USDT balance:", (error as Error).message);
      throw error;
    }
  };

  // Get the latest block number
  const getLatestBlockNumber = async () => {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      return blockNumber;
    } catch (error) {
      console.error(
        "Error fetching latest block number:",
        (error as Error).message
      );
      throw error;
    }
  };

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [lastblockNumber, setLastblockNumber] = useState<number | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await getUSDTBalance(address);
      const lastblockNumber = await getLatestBlockNumber();
      setLastblockNumber(lastblockNumber);
      setBalance(result.balance);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="bg-gray-400 p-6 rounded-lg shadow-md max-w-md mx-auto my-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full py-4 px-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
        />
        <button
          className="w-full py-4 px-6 bg-blue-gradient font-poppins font-medium text-[1rem] text-primary  outline-none  rounded-[10px] hover:text-gray-500
          "
          type="submit"
        >
          Fetch USDT Balance
        </button>
      </form>
      {balance !== null && (
        <div className="mt-4 text-teal-700 space-y-4 ">
          <p className=" bg-white font-semibold w-full py-4 px-6 border border-gray-300 rounded-md flex justify-center items-center">
            Balance: {balance} USDT
          </p>
          <p className="font-semibold w-full py-4 px-6 border border-gray-300 rounded-md bg-white flex justify-center items-center">
            Last Block Number: {lastblockNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default USDTBalanceFetcher;
