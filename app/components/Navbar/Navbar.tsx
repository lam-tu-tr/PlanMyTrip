import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/itinerarygenie_favicon.png";
import "./Navbar.scss";
import SigninButton from "../Signin/SigninButton";

export default function Navbar() {
  return (
    <nav className="MainNav flex flex-row justify-between items-center px-4">
      <Link className="" href="/">
        <span>
          <Image
            src={Logo}
            fill={true}
            style={{ objectFit: "contain" }}
            alt="ItineraryGenie Logo"
          ></Image>
        </span>
        <span>ItineraryGenie</span>
      </Link>

      <SigninButton />
    </nav>
  );
}
