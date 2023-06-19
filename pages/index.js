import React, { Fragment, useEffect, useState } from "react";
import Entry from "../components/entry";
import NewEntry from "../components/new-entry";
import Image from "next/image";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DollarIcon from "../public/icons/DollarIcon";
import ConsistentIcon from "../public/icons/Consistent";
import TimeIcon from "../public/icons/TimeIcon";
import Link from "next/link";

//let purchases = [];

const DUMMY_PURCHASES = [
  { date: "2020-12-03", purchaseValue: 2500, amount: 0.5, coinPrice: 5000 },
  { date: "2019-03-02", purchaseValue: 2000, amount: 0.25, coinPrice: 8000 },
];

export default function Home(props) {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="heading">
            <h1>
              Easily track your bitcoin <br /> DCA investments
            </h1>
            <p>Have all of your progress in one place.</p>
            <Link href="/track-investments" className="callToAction">
              Start tracking
            </Link>
          </div>
          <div className="secondary">
            <h2>What is DCA?</h2>
            <p>
              DCA is a smart strategy for investing in Bitcoin by buying fixed
              dollar <br /> amount at regular intervals, reducing volatility
              impact.
            </p>
            <Link href="/what-is-dca" className="callToAction">
              Learn More
            </Link>
          </div>

          {/* {!session && (
      <div className="info">
        <p>Login to submit your purchases</p>
      </div>
    )} */}
        </div>

        <div className="howToUse">
          <h2>How to use DCA?</h2>
          <div className="content">
            <div className="item">
              <DollarIcon />
              <h3>Set a budget</h3>
              <p>
                Decide how much you can afford to <br /> invest in Bitcoin on a
                regular basis. <br /> (monthly or weekly)
              </p>
            </div>
            <div className="item">
              <ConsistentIcon />
              <h3>Be consistent</h3>
              <p>
                DCA is a long-term strategy, so <br /> don't get discouraged by
                short-term <br /> price fluctuations.
              </p>
            </div>
            <div className="item">
              <TimeIcon />
              <h3>Be Patient</h3>
              <p>
                Remember that the goal is to reduce <br /> the impact of
                volatility on the <br /> overall purchase.
              </p>
            </div>
          </div>
        </div>
        <div className="makeAnImpact">
          <h2>Make an impact</h2>
          <p>
            Support our goal of promoting long-term, consistent investment in{" "}
            <br />
            Bitcoin through DCA strategy.{" "}
          </p>
          <Link href="/donate" className="callToAction">
            Support us
          </Link>
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");

//   const filteredCoins = await res.json();

//   let purchases = [];

//   let session;
//   try {
//     session = await getSession({ req: context.req });

//     if (session) {
//       const response = await fetch(`${process.env.DOMAIN}/api/get-purchases`, {
//         method: "GET",
//         headers: {
//           cookie: context.req.headers.cookie || "",
//         },
//       });
//       purchases = await response.json();
//     }
//   } catch (error) {
//     //
//   }

//   //const body = res.body();

//   //const btcPrice = body.last;

//   //console.log(filteredCoins);

//   return {
//     props: {
//       purchases: purchases,
//       filteredCoins,
//       session: session,
//     },
//   };
// };
