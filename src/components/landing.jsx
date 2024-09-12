import React, { useState } from 'react';
import Web3 from 'web3';
import { getPaymasterParams, ZKsyncPlugin } from 'web3-plugin-zksync';
import { APPROVAL_TOKEN, PAYMASTER, USDC_L1 } from './constants.mjs';
import { ZKsyncWallet } from 'web3-plugin-zksync';

// Import the necessary images from assets
import logo1 from '../assets/chainsafe.jpeg';
import logo2 from '../assets/ethsafari.jpeg';
import logo3 from '../assets/zksync.jpeg';
import background from '../assets/background.jpeg'; // Import background image

const TransactionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const [userId, setUserId] = useState('')

  const handleTransaction = async () => {
    setLoading(true);
    setError('');
    try {
      // initialize web3 and plugin
      const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/VCOFgnRGJF_vdAY2ZjgSksL6-6pYvRkz');
      web3.registerPlugin(new ZKsyncPlugin('https://sepolia.era.zksync.dev'));

      // initialize wallet with a private key
      const privateKey = '0xde71c689c1beb62bfa3385b0278b2258527481906c4b9b3aad45edd56229b177';
      const wallet = new web3.ZKsync.Wallet(privateKey);
      const amountOfERC20ToTransfer = 1;
      const minimalAllowance = 1;

      const l2Provider = wallet.provider;
      const USDC_L2 = await l2Provider.l2TokenAddress(USDC_L1);
      console.log('USDC L1 contract address 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238');
      console.log('USDC L2 contract address', USDC_L2);

      // Get balances before transaction
      const balance_paymaster_eth_before = await l2Provider.getBalance(PAYMASTER);
      const balance_paymaster_approvalToken_before = await l2Provider.getTokenBalance(APPROVAL_TOKEN, PAYMASTER);
      const balance_sender_eth_before = await wallet.getBalance();
      const balance_sender_usdc_before = await wallet.getBalance(USDC_L2);
      const balance_sender_approval_token_before = await wallet.getBalance(APPROVAL_TOKEN);
      const random = ZKsyncWallet.createRandom();
      const balance_receiver_usdc_before = await l2Provider.getTokenBalance(USDC_L2, random.getAddress());

      // Perform transfer
      const tx = await wallet.transfer({
        token: APPROVAL_TOKEN,
        to: random.getAddress(),
        amount: amountOfERC20ToTransfer, // number of tokens you are transferring
        paymasterParams: getPaymasterParams(PAYMASTER, {
          type: 'ApprovalBased',
          token: APPROVAL_TOKEN,
          minimalAllowance: minimalAllowance,
          innerInput: new Uint8Array(),
        }),
      });

      const result = await tx.wait();
      console.log('transaction', result.transactionHash);
      setTransactionHash(result.transactionHash);

      // Get balances after transaction
      const balance_paymaster_eth_after = await l2Provider.getBalance(PAYMASTER);
      const balance_paymaster_approvalToken_after = await l2Provider.getTokenBalance(APPROVAL_TOKEN, PAYMASTER);
      const balance_sender_eth_after = await wallet.getBalance();
      const balance_sender_usdc_after = await wallet.getBalance(USDC_L2);
      const balance_sender_approval_token_after = await wallet.getBalance(APPROVAL_TOKEN);
      const balance_receiver_usdc_after = await l2Provider.getTokenBalance(USDC_L2, random.getAddress());

      console.log('-----ETH BALANCES BEFORE VS AFTER-----');
      console.log(balance_sender_eth_before, 'Sender ETH before');
      console.log(balance_sender_eth_after, 'Sender ETH after(equal)');
      console.log(balance_paymaster_eth_before, 'Paymaster ETH before');
      console.log(balance_paymaster_eth_after, 'Paymaster ETH after (decreased)');

      console.log('-----USDC BALANCES BEFORE VS AFTER-----');
      console.log(balance_sender_usdc_before, 'Sender USDC before');
      console.log(balance_sender_usdc_after, 'Sender USDC after(-5)');
      console.log(balance_receiver_usdc_before, 'Receiver USDC before(0)');
      console.log(balance_receiver_usdc_after, 'Receiver USDC after(+5)');

      console.log('-----APPROVALTOKEN(Crown ERC20) BALANCES BEFORE VS AFTER-----');
      console.log(balance_sender_approval_token_before, 'Sender ApprovalToken before');
      console.log(balance_sender_approval_token_after, 'Sender ApprovalToken after(-1)');
      console.log(balance_paymaster_approvalToken_before, 'Paymaster Approval Token before:');
      console.log(balance_paymaster_approvalToken_after, 'Paymaster Approval Token after(+1)');

    } catch (err) {
      console.error('Transaction error', err);
      setError('An error occurred during the transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container background style={{ background: `url(${background})` }}">
        <h1 className="title">Perform zkSync Transaction</h1>
        <div className='buttons'>
            <button className="transaction-button" onClick={handleTransaction} disabled={loading}>
            {loading ? 'Processing...' : 'Execute Transaction'}
            </button>
        </div>
        {transactionHash && <p className="info">Transaction Hash: {transactionHash}</p>}
        {error && <p className="error">{error}</p>}
        <div className='cards'>
            <div className='card'>
                <h2>Transactions</h2>
                <p><span className='font-bolding'>Sender Id</span> : {userId}</p>
                <p><span className='font-bolding'>Sender Id</span></p>
            </div>
        </div>
          
      <footer className="footer">
        <div className="footer-logo">
          <img src={logo1} alt="chainsafe" />
        </div>
        <div className="footer-logo">
          <img src={logo2} alt="ethsafari" />
        </div>
        <div className="footer-logo">
          <img src={logo3} alt="zksync" />
        </div>
      </footer>
  
    </div>
    

  )};

export default TransactionComponent;
