import { getPaymasterParams, Web3ZKsyncL2, ZKsyncPlugin } from "web3-plugin-zksync";
import { Web3 } from "web3";
import { APPROVAL_TOKEN, PAYMASTER, USDC_L1 } from "./constants.mjs";
import { ZKsyncWallet, types } from "web3-plugin-zksync";

export default function Signup (){
    const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/VCOFgnRGJF_vdAY2ZjgSksL6-6pYvRkz");
    web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

    const privateKey = "0xde71c689c1beb62bfa3385b0278b2258527481906c4b9b3aad45edd56229b177";
    const wallet = new web3.ZKsync.Wallet(privateKey);
    const amountOfERC20ToTransfer = 21;
    const minimalAllowance = 1;

    const l2Provider = wallet.provider;
    const USDC_L2 = l2Provider.l2TokenAddress(USDC_L1);

    const balance_paymaster_eth_before = l2Provider.getBalance(PAYMASTER);
    const balance_paymaster_approvalToken_before = l2Provider.getTokenBalance(APPROVAL_TOKEN, PAYMASTER);
    const balance_sender_eth_before = wallet.getBalance();
    const balance_sender_usdc_before = wallet.getBalance(USDC_L2);
    const balance_sender_approval_token_before = wallet.getBalance(APPROVAL_TOKEN);
    const random = ZKsyncWallet.createRandom();
    const balance_receiver_usdc_before = l2Provider.getTokenBalance(USDC_L2, random.getAddress());

    const makeDonation = () => {
        const tx = wallet.transfer({
            token: APPROVAL_TOKEN,
            to: random.getAddress(),
            amount: amountOfERC20ToTransfer, 
            paymasterParams: getPaymasterParams(PAYMASTER, {
              type: "ApprovalBased",
              token: APPROVAL_TOKEN,
              minimalAllowance: minimalAllowance,
              innerInput: new Uint8Array(),
            }),
        });
        const result = tx.wait();
        console.log("transaction", result.transactionHash);      
    }

    const balance_paymaster_eth_after = l2Provider.getBalance(PAYMASTER);
    const balance_paymaster_approvalToken_after = l2Provider.getTokenBalance(APPROVAL_TOKEN, PAYMASTER);
    const balance_sender_eth_after = wallet.getBalance();
    const balance_sender_usdc_after = wallet.getBalance(USDC_L2);
    const balance_sender_approval_token_after = wallet.getBalance(APPROVAL_TOKEN);
    const balance_receiver_usdc_after = l2Provider.getTokenBalance(USDC_L2, random.getAddress());
  
    console.log("-----ETH BALANCES BEFORE VS AFTER-----");
    console.log(balance_sender_eth_before, "Sender ETH before");
    console.log(balance_sender_eth_after, "Sender ETH after(equal)");
    console.log(balance_paymaster_eth_before, "Paymaster ETH before");
    console.log(balance_paymaster_eth_after, "Paymaster ETH after (dicreased)");
  
    console.log("-----USDC BALANCES BEFORE VS AFTER-----");
    console.log(balance_sender_usdc_before, "Sender USDC before");
    console.log(balance_sender_usdc_after, "Sender USDC after(-5)");
    console.log(balance_receiver_usdc_before, "Receiver USDC before(0)");
    console.log(balance_receiver_usdc_after, "Receiver USDC after(+5)");
  
    console.log("-----APPROVALTOKEN(Crown ERC20) BALANCES BEFORE VS AFTER-----");
    console.log(balance_sender_approval_token_before, "Sender ApprovalToken before");
    console.log(balance_sender_approval_token_after, "Sender ApprovalToken after(-1)");
    console.log(balance_paymaster_approvalToken_before, "Paymaster Approval Token before:");
    console.log(balance_paymaster_approvalToken_after, "Paymaster Approval Token after(+1)");
  

    return(
        <div className="w-full bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Our Cause</h1>
                <p className="text-gray-600 text-lg">Your contribution makes a difference</p>
            </div>

            <div className="text-center mb-8">
                <button onClick={makeDonation} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Donate</button>
            </div>
        
            <div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Transaction #1</h2>
                    <p className="text-gray-600">Amount: $50</p>
                    <p className="text-gray-500">Date: 2024-09-11</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Transaction #2</h2>
                    <p className="text-gray-600">Amount: $100</p>
                    <p className="text-gray-500">Date: 2024-09-10</p>
                </div>
            </div>
        </div>
    )
}