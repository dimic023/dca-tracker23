import React, { useRef, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function generateId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomNum}`;
}

const NewEntry = (props) => {
  const dateRef = useRef();
  //const coinRef = useRef();
  const purchaseValueRef = useRef();
  const coinPriceRef = useRef();

  const [isValidInput, setIsValidInput] = useState(true);
  const [purchaseAdded, setPurchaseAdded] = useState(false);

  //const isMobileDevice = useWindowSize();

  // const handleDateChange = (date) => {
  //   const formattedDate = moment(date).format("YYYY-MM-DD");
  //   setSelectedDate(formattedDate);
  // };

  // const handleInputChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // const onCancel = (event) => {
  //   event.preventDefault();
  //   props.onCancel();
  // };

  const submitHandler = async (event) => {
    setIsValidInput(true);
    setPurchaseAdded(false);

    event.preventDefault();

    const enteredDate = dateRef.current.value;
    //const enteredCoin = coinRef.current.value;
    const enteredPurchaseValue = purchaseValueRef.current.value;
    const enteredCoinPrice = coinPriceRef.current.value;

    const purchaseData = {
      id: generateId(),
      date: enteredDate,
      coin: "BTC",
      purchaseValue: enteredPurchaseValue,
      coinPrice: enteredCoinPrice,
      amount: (enteredPurchaseValue / enteredCoinPrice).toFixed(4),
      //valueNow: enteredPurchaseValue,
      //roi: 0,
    };

    console.log("PURCHASE DATA IS: ", purchaseData);

    const response = await fetch("/api/add-purchase", {
      method: "POST",
      body: JSON.stringify(purchaseData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setIsValidInput(false);
    }

    if (response.ok) {
      setPurchaseAdded(true);
      props.onAddEntry(purchaseData);
      toast.success("Purchase added!");
    }
  };

  return (
    <div className={props.mobile ? "form mobile" : "form"}>
      <h2>Track your coins</h2>
      <form onSubmit={submitHandler}>
        <div className="inputs">
          <div className="dateContainer">
            <label>Date*</label>
            <input required type="date" id="date" ref={dateRef} />

            {/* <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              onClickOutside={() => setSelectedDate(null)} // To close the date picker when clicked outside
            />
            {selectedDate && (
              <p>Selected date in "YYYY-MM-DD" format: {selectedDate}</p>
            )} */}
          </div>
          {/* <div className={classes.formInput}>
          <label>Coin</label>

          <select required ref={coinRef}>
            <option>BTC</option>
            <option>ETH</option>
            <option>LINK</option>
          </select>
        </div> */}
          <div>
            <label>Purchase value ($)*</label>
            <input required ref={purchaseValueRef} />
          </div>
          <div>
            <label>Coin Price ($)*</label>
            <input defaultValue={props.btcPrice} required ref={coinPriceRef} />
          </div>
          {!isValidInput && (
            <div>
              <p>Invalid input</p>
            </div>
          )}
          {purchaseAdded && (
            <div>
              <p>Purchase added</p>
            </div>
          )}

          <div>
            {/* <button onClick={onCancel}>Cancel</button> */}
            <button className="callToAction">Submit</button>
            {props.mobile && (
              <button onClick={props.showTable} className="callToAction back">
                Back to overview
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;
