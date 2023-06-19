import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="left">
          <p className="big">DCA Tracker</p>
          <p>Copyright 2023 © DCA Tracker. All rights reserved.</p>
        </div>
        <div className="right">
          <Link href="/what-is-dca">About DCA</Link>
          <Link href="/donate">Support us</Link>
        </div>
      </div>
    </footer>
  );
}
