import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";

import styles from "./SignIn.module.scss";
import ExtProviderButton from "@/components/Signin/ExtProviderButton";

export default function SignIn() {
  return (
    <div className={`page-container`}>
      <section className={styles["signIn-container"]}>
        <ExtProviderButton provider={"google"} />
      </section>
    </div>
  );
}
