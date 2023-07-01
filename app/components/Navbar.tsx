import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="MainNav flex flex-row justify-between items-center text-white px-4">
      <Link className="w-20 text-center" href="/">
        Home
      </Link>
      <aside>Trips</aside>
      <Link className="w-20 text-center" href="../routes/account">
        Account
      </Link>
    </div>
  );
}
