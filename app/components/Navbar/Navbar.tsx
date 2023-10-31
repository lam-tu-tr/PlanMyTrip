import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/itinerarygenie_logo.png";

export default function Navbar() {
  return (
    <div className="MainNav flex flex-row justify-between items-center px-4">
      <Link className="w-40" href="/">
        <Image src={Logo} alt="ItineraryGenie Logo" />
      </Link>

      <Link className=" text-center text-white" href="/routes/account">
        Account
      </Link>
    </div>
  );
}
