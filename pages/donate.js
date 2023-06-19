import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListItem({ coin, address }) {
  const handleClick = (event) => {
    copyToClipboard(event, address);
  };

  function copyToClipboard(event, address) {
    event.preventDefault();
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log("Address copied to clipboard:", address);
        toast.success("Address copied!");
      })
      .catch((error) => {
        console.error("Failed to copy address to clipboard:", error);
        toast.error("Failed to copy address.");
      });
  }

  return (
    <li>
      <a href="#" onClick={handleClick}>
        {coin}: {address}
      </a>
    </li>
  );
}

function DonatePage() {
  return (
    <div className="donatePage">
      <h1>Join us in making a difference</h1>
      <p>
        Your donation can make a significant impact on our organization and help
        us continue to pursue our mission.
      </p>
      <p className="click">Click on any crypto token to copy address</p>
      <div>
        <ul>
          <ListItem
            coin="BITCOIN"
            address="1M1Vqe1SETRhL7tWkDnDx8eh3rMuwCFsoH"
          />
          <ListItem
            coin="ETHEREUM"
            address="0x4969d64c72588911604113b0cf86c307608b7000"
          />
          <ListItem
            coin="USDT (ETH)"
            address="0x36dC5d17F14DaD063a46Ef74f56477765C6312BA"
          />
          <ListItem
            coin="BNB"
            address="bnb1cgs8jmrxgzzj7swnu8pelgyf84dapqzsqcxdp3"
          />
          <ListItem
            coin="LITECOIN"
            address="LcVUA5Dj5Mb4HPnpNWK6eaYKxncgJEsQKk"
          />
        </ul>
      </div>
    </div>
  );
}

export default DonatePage;
