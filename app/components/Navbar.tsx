import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="MainNav flex flex-row justify-between items-center text-white px-4">
      <Link className="w-20 text-center" href="/">
        Home
      </Link>
      <Link className="w-20 text-center" href="/r/tripList">
        Trips
      </Link>
      <Link className="w-20 text-center" href="/r/account">
        Account
      </Link>
    </div>
  );
}
