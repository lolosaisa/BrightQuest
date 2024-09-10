import React from 'react';
import { Web3 } from "web3";
import { ZKsyncPlugin } from "web3-plugin-zksync";

const App = () => {
  const web3 = new Web3();

  web3.registerPlugin(new ZKsyncPlugin(window.ethereum));

  async function sendOneWei() {
    const accounts = await web3.ZKsync.L2.eth.requestAccounts();

    const to = web3.eth.accounts.create();

    const tx = {
      from: accounts[0],
      to: to.address,
      value: 1,
    };

    const populated = await web3.ZKsync.L2.populateTransaction(tx);
    console.log("populated", populated);

    const txReceipt = await web3.ZKsync.L2.eth.sendTransaction(populated);

    console.log("signature", txReceipt.transactionHash);
  }

  return (
    <div>
      <header>
        <h1>Kids E-Learning Page</h1>
      </header>

      <main>
        <section>
          <h2>Welcome to Our Kids E-Learning Page</h2>
          <p>
            We are dedicated to providing high-quality educational resources for kids of all ages. Our platform offers a wide range of interactive lessons, engaging games, and fun activities to help children learn and grow.
          </p>
        </section>

        <section>
          <h2>Featured Courses</h2>
          <ul>
            <li>Math</li>
            <li>Reading</li>
            <li>Science</li>
            <li>Coding</li>
          </ul>
        </section>

        <section>
          <h2>Support Our Mission</h2>
          <p>
            Help us continue to provide high-quality educational resources for kids. Your donation will make a difference in the lives of young learners.
          </p>
          <button onClick={sendOneWei}>Donate Now</button>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Kids E-Learning Page. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;