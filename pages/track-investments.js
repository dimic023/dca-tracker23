import { getSession, useSession } from "next-auth/react";
import NewEntry from "../components/new-entry";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Entry from "../components/entry";
import { compareSync } from "bcryptjs";
import useWindowSize from "../hooks/useWindowSize";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function trackInvestmentsPage(props) {
  const router = useRouter();
  const purchases = props.purchases;
  const [newEntries, setNewEntries] = useState(purchases);
  const isMobileDevice = useWindowSize();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (!props.session) {
      router.push("/login");
    }
  }, [props.session, router]);

  const addEntryHandler = async (purchaseData) => {
    setNewEntries(newEntries.concat(purchaseData));
    setFormVisible(false);
  };

  let btcPrice;

  if (props.filteredCoins.tickers[0].base === "ETH") {
    btcPrice = props.filteredCoins.tickers[1].last;
  } else {
    btcPrice = props.filteredCoins.tickers[0].last;
  }

  const removeEntryHandler = async (id) => {
    if (id) {
      //console.log("DELETING THIS ID:", id);
      //console.log("newEntries are: ", newEntries);
      let newArray = newEntries.filter((entry) => entry.id !== id);
      //console.log("NEW ARRAY IS: ", newArray);

      //newArray.splice(index, 1);

      const response = await fetch("/api/update-purchases", {
        method: "PATCH",
        body: JSON.stringify(newArray),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setNewEntries(newArray);
      toast.success("Purchase deleted!");
    } else {
      console.log("ID FOR DELETING THAT ITEM IS INVALID");
      toast.error("Failed to delete item");
    }
  };

  let total = 0;
  let totalAmount = 0;
  for (let i = 0; i < newEntries.length; i++) {
    const value = parseInt(newEntries[i].purchaseValue);
    const amount = parseFloat(newEntries[i].amount);
    total = total + value;
    totalAmount = totalAmount + amount;
  }

  const worthNow = (totalAmount * btcPrice).toFixed(0);

  const showForm = () => {
    setFormVisible(true);
  };

  const showTable = () => {
    setFormVisible(false);
  };

  return (
    <div className="container">
      <div className="trackInvestmentsPage">
        {" "}
        {/* <div className="addPurchaseButton__container">
        <button onClick={onAddPurchaseButton} className="addPurchaseButton">
          Add new purchase
        </button>
      </div>
      {!formVisible && !session && (
        <div className="addPurchaseButton__container">
          <button onClick={onAddNoSession} className="addPurchaseButton">
            Add new purchase
          </button>
        </div>
      )} */}
        {!isMobileDevice && (
          <NewEntry
            onAddEntry={addEntryHandler}
            //onCancel={onCancelHandler}
            btcPrice={btcPrice}
          />
        )}
        {isMobileDevice && formVisible && (
          <NewEntry
            onAddEntry={addEntryHandler}
            //onCancel={onCancelHandler}
            btcPrice={btcPrice}
            mobile={true}
            showTable={showTable}
          />
        )}
        <div className={formVisible ? "table hideOnMobile" : "table"}>
          {/* <h2 className="tableTitle">Previous Purchases</h2> */}
          <div className="total">
            <p>Tolal invested: ${total}</p>
            <p>Worth now: ${worthNow}</p>
          </div>
          <div className="tableWrapper">
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Purchase value</th>
                  <th className="hideOnMobile">Amount</th>
                  <th>Bitcoin Price</th>
                  <th>Value now</th>
                  <th>ROI</th>
                </tr>

                {newEntries.map((purchase, i) => (
                  <Entry
                    id={purchase.id}
                    onAddEntry={addEntryHandler}
                    onRemoveEntry={removeEntryHandler}
                    key={i}
                    date={purchase.date}
                    coin={purchase.coin}
                    purchaseValue={purchase.purchaseValue}
                    coinPrice={purchase.coinPrice}
                    amount={purchase.amount}
                    btcPrice={btcPrice}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {isMobileDevice && (
            <div className="sticky-button-container">
              <button onClick={showForm} className="callToAction trackCoins">
                Track Coins
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

  const filteredCoins = await res.json();

  let purchases = [];

  let session;
  try {
    session = await getSession({ req: context.req });

    if (session) {
      const response = await fetch(`${process.env.DOMAIN}/api/get-purchases`, {
        method: "GET",
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      });
      purchases = await response.json();
    }
  } catch (error) {
    //
  }

  //const body = res.body();

  //const btcPrice = body.last;

  //console.log(filteredCoins);

  return {
    props: {
      purchases: purchases,
      filteredCoins,
      session,
    },
  };
};
