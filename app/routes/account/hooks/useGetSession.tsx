"use client";

import { useEffect } from "react";
import supabase from "@/supabase/supabaseClient";

import { RootState } from "@/context/store";
import { useSelector, useDispatch } from "react-redux";

import { setSession, logOut } from "@/context/slices/session/sessionSlice";

export default function useGetSession() {
  const session = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  console.log(session.data);
  console.log(session.user_metadata);
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      dispatch(setSession(data));
    };

    getSession();
  }, [dispatch]);
  return <div>temperary</div>;
}
