import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="MainNav flex flex-row justify-between items-center px-4">
      <Link className="w-20 text-center text-white" href="/">
        ItineraryGenie
      </Link>

      <Link className="w-20 text-center text-white" href="/routes/account">
        Account
      </Link>
    </div>
  );
}
