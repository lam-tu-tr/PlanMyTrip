//*
//*--------------------------/routes/account------------------------------------
// "use client";

import { redirect } from "next/navigation";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import styles from "./account.module.scss";
import LocationCard from "../../components/LocationCard/LocationCard";
import { CardProps } from "@/helpers/types";
import { useState } from "react";
import useFetchLocationList from "./hooks/useFetchLocationList";
import { BsCommand } from "react-icons/bs";
// import { toastError } from "@/helpers/toast";
import { getServerSession } from "next-auth";
import supabase from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";
import FetchLocationListCopy from "./hooks/FetchLocationListCopy";

export default async function Account() {
  const session = await getServerSession();
  const user = session?.user;
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/routes/SignIn?callbackUrl=/routes/account");
  //   },
  // });

  const destItems = await FetchLocationListCopy();
  console.log("destitems", destItems);
  // const [destItems, setDestItems] = useState<CardProps[]>([]);

  // useFetchLocationList({ setDestItems });

  const handleSignOut = async () => {
    console.log("handlesignout");
    const signOutRes = await signOut({ callbackUrl: "/" });
  };

  if (session && session.user) {
    const user_name = session.user.name;
    const user_avatar = session.user.image;
    const user_email = session.user.email;
    return (
      <div className="page-container">
        <section className={`${styles["account-body"]}`}>
          <section className={`${styles["user-profile"]}`}>
            {user_avatar && (
              <div>
                <Image
                  src={user_avatar}
                  width={50}
                  height={50}
                  alt="Profile Picture"
                />
              </div>
            )}
            <span>
              <h2>{user_name}</h2>
              <p>{user_email}</p>
            </span>
            {/* <button type="button" onClick={handleSignOut}>
              <TbLogout className="w-8 h-8" />
            </button> */}
          </section>
          <h1>Itineraries</h1>
          {destItems?.length == 0 ? (
            <section className={styles.empty}>
              <div>
                <BsCommand className="w-48 h-48" />
                <h2>View your generated itineraries here</h2>
              </div>
            </section>
          ) : (
            <ul className={`${styles["trip-list"]}`}>
              {destItems?.map((item: any, index: number) => {
                return <LocationCard key={index} cardItem={item} />;
              })}
            </ul>
          )}
        </section>
      </div>
    );
  }
  return <></>;
}
