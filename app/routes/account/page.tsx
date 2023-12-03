//*
//*--------------------------/routes/account------------------------------------
"use client";

import { redirect } from "next/navigation";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import styles from "./account.module.scss";
import Card from "./components/Card/Card";
import { CardProps, destType } from "@/helpers/types";
import { useState } from "react";
import useGetLocationList from "./hooks/useGetLocationList";

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
  const [destItems, setDestItems] = useState<CardProps[]>([]);

  useGetLocationList({ setDestItems });
  // const { isWindow, setIsWindow } = useGlobalContext();

  // const [currentUser, setCurrentUser] = useState<string | null>(null);

  // const [createAccount, setCreateAccount] = useState(false);

  // const router = useRouter();
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
            <button type="button" onClick={handleSignOut}>
              <TbLogout className="w-8 h-8" />
            </button>
          </section>
          <section className={`${styles["trip-list"]}`}>
            <Card destItems={destItems} />
          </section>
        </section>
      </div>
    );
  }
  return <></>;
}
