import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="MainNav flex flex-row justify-between items-center text-white px-4">
      <Link href="/">Home</Link>
      <aside>Trips</aside>
      <aside>Account</aside>
    </div>
  );
}
