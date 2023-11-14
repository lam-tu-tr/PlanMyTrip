import styles from "./SignIn.module.scss";
import ExtProviderButton from "./component/ExtProviderButton/ExtProviderButton";

export default function SignIn() {
  return (
    <div className={`page-container`}>
      <section className={styles["signIn-container"]}>
        <ExtProviderButton />
      </section>
    </div>
  );
}
