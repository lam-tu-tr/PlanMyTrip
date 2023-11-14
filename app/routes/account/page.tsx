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
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

const Account: NextPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/routes/SignIn?callbackUrl=/routes/account");
    },
  });

  const user_name = session?.user?.name;
  const user_avatar = session?.user?.image;
  const user_email = session?.user?.email;

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const [destItems, setDestItems] = useState<destType[]>([]);

  // const { isWindow, setIsWindow } = useGlobalContext();

  // const [currentUser, setCurrentUser] = useState<string | null>(null);

  // const [createAccount, setCreateAccount] = useState(false);

  // const router = useRouter();

  return (
    <div id="account" className="page-container">
      <section className="signIn-container">{user_name}</section>
      {user_avatar && (
        <Image src={user_avatar} width={40} height={40} alt="Profile Picture" />
      )}
    </div>
  );
};
export default Account;
