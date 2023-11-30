//*
//*--------------------------/routes/account------------------------------------
"use client";

import { useState, useEffect } from "react";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { useGlobalContext } from "@/Context";
import { v4 as uuidv4 } from "uuid";
import { redirect, useRouter } from "next/navigation";
import { destType } from "@/helpers/types";
import { toastError } from "@/helpers/toast";
import Topography from "@/components/Topography/Topography";
import Image from "next/image";
import { getSession, useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { TbLogout } from "react-icons/tb";
import styles from "./account.module.scss";
import Card from "./components/Card/Card";

export default function Account() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/routes/SignIn?callbackUrl=/routes/account");
    },
  });

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const [destItems, setDestItems] = useState<destType[]>([]);

  // const { isWindow, setIsWindow } = useGlobalContext();

  // const [currentUser, setCurrentUser] = useState<string | null>(null);

  // const [createAccount, setCreateAccount] = useState(false);

  // const router = useRouter();
  const handleSignOut = async () => {
    console.log("handlesignout");
    const signOutRes = await signOut({ callbackUrl: "http://localhost:3000/" });
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
            <button type="button" onClick={handleSignOut}>
              <TbLogout className="w-8 h-8" />
            </button>
          </section>
          <section className={`${styles["trip-list"]}`}>
            <Card />
          </section>
        </section>
      </div>
    );
  }
  return <></>;
}
