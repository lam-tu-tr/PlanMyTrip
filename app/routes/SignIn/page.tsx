import "./signin.scss";
import { ExtProviderButton } from "@/components/ExtProviderButton/ExtProviderButton";

export default function SignIn() {
  return (
    <div className="page-container">
      <section className="signin-container">
        <ExtProviderButton />
      </section>
    </div>
  );
}
