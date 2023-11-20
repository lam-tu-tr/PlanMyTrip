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
import { getSession, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

import styles from "./account.module.scss";
import Card from "./components/Card/Card";
import supabase from "@/supabase/supabaseClient";
import useGetSession from "./hooks/useGetSession";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/context/store";

import { TbLogout } from "react-icons/tb";
import { logOut } from "@/context/slices/session/sessionSlice";

export default function Account() {
  const session = useSelector((state: RootState) => state.session);
  const user = session.user_metadata;
  // const session_data = session.data;
  console.log(session);
  const dispatch = useDispatch();

  useGetSession();

  if (session && user) {
    const user_name = user.full_name;
    const user_avatar = user.picture;
    const user_email = user.email;

    return (
      <div className="page-container">
        <section className={`${styles["account-body"]}`}>
          <section className={`${styles["user-profile"]}`}>
            {user_avatar && (
              <span>
                <div>
                  <Image src={user_avatar} fill={true} alt="Profile Picture" />
                </div>
                <span>
                  <h2>{user_name}</h2>
                  <p>{user_email}</p>
                </span>
              </span>
            )}
            <a href="/" onClick={() => dispatch(logOut())}>
              <TbLogout className="w-8 h-8" />
            </a>
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
