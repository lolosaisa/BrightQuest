import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:8545'); // Change to your Ethereum node URL

const Signup = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleDonate = async () => {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0]; // Use the first account

    const transaction = {
      from: sender,
      to: recipient,
      value: web3.utils.toWei(amount, 'ether'), // Assuming crowns are represented as Ether
      gas: 2000000,
    };

    try {
      const receipt = await web3.eth.sendTransaction(transaction);
      setTransactionDetails(receipt);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div>
      <h1>Donate Crowns</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount in Crowns"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>

      {transactionDetails && (
        <div>
          <h2>Transaction Details</h2>
          <p>Transaction Hash: {transactionDetails.transactionHash}</p>
          <p>From: {transactionDetails.from}</p>
          <p>To: {transactionDetails.to}</p>
          <p>Value: {web3.utils.fromWei(transactionDetails.value, 'ether')} Crowns</p>
          <p>Status: {transactionDetails.status ? 'Success' : 'Failed'}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;