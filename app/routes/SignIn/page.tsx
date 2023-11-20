import styles from "./SignIn.module.scss";
import ExtProviderButton from "./component/ExtProviderButton/ExtProviderButton";
import supabase from "@/supabase/supabaseClient";

export default function SignIn() {
  // supabase.auth.onAuthStateChange(async);
  return (
    <div className={`page-container`}>
      <section className={styles["signIn-container"]}>
        <ExtProviderButton />
      </section>
    </div>
  );
}
