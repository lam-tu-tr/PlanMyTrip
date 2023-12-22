import "./signin.scss";
import { ExtProviderButton } from "@/components/ExtProviderButton/ExtProviderButton";

export default function SignIn() {
  return (
    <div className="page-container">
      <section className="signin-container">
        <h1>
          Sign in to save and share <br /> your itineraries
        </h1>
        <ExtProviderButton />
      </section>
    </div>
  );
}
