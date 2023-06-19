import Image from "next/image";
import VolatilityImage from "/public/images/volatility.png";
import AmountsImage from "/public/images/amounts.png";
import Link from "next/link";

function WhatIsDcaPage() {
  return (
    <div className="whatIsDcaPage">
      <div className="container">
        <h1>What Is Dollar Cost Average? (DCA)</h1>
        <div className="section">
          <p>
            DCA Bitcoin involves buying a fixed dollar amount of Bitcoin at{" "}
            regular intervals, regardless of the current price. This strategy
            can reduce the risk of buying Bitcoin at a high price and help
            smooth out the effects of market volatility.
          </p>
          <Image
            src={VolatilityImage}
            width={724}
            height={324}
            alt="volatility"
          ></Image>
        </div>
        <div className="section">
          <Image
            src={AmountsImage}
            width={724}
            height={324}
            alt="volatility"
          ></Image>
          <p>
            DCA Bitcoin involves buying a fixed dollar amount of Bitcoin at
            regular intervals, regardless of the current price. This strategy
            can reduce the risk of buying Bitcoin at a high price and help
            smooth out the effects of market volatility.
          </p>
        </div>
        <div className="strategize">
          <h2>Strategize your investment</h2>
          <p>
            Invest smart and maximize potential returns with Dollar-Cost
            Averaging (DCA).
          </p>
          <Link href="/track-investments" className="callToAction">
            Invest now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WhatIsDcaPage;
