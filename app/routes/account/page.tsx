import { redirect } from "next/navigation";

import Image from "next/image";
import styles from "./account.module.scss";

import { TripCard } from "@/components/TripCard/TripCard";
import { SignOutButton } from "@/components/Auth/SignOutButton";

import { BsCommand } from "react-icons/bs";

import { getServerSession } from "next-auth";

import { handleFetchLocationList } from "./helpers/handleFetchLocationList";
import { TripCardType } from "@/helpers/types";

export default async function Account() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/routes/signin");
  }

  const cardItineraryList: TripCardType[] = await handleFetchLocationList();

  return (
    <div className="page-container">
      <section className={`${styles["account-body"]}`}>
        <section className={`${styles["user-profile"]}`}>
          <div>
            <Image
              src={session.user.image!}
              width={50}
              height={50}
              alt="Profile Picture"
            />
          </div>

          <span>
            <h2>{session.user.name}</h2>
            <p>{session.user.email}</p>
          </span>

          <SignOutButton />
        </section>

        <h1>Itineraries</h1>

        {cardItineraryList?.length == 0 ? (
          <section className={styles.empty}>
            <div>
              <BsCommand className="w-48 h-48" />
              <h2>View your generated itineraries here</h2>
            </div>
          </section>
        ) : (
          <ul className={`${styles["trip-list"]}`}>
            {cardItineraryList?.map((item: any, index: number) => {
              return <TripCard key={index} trip={item} />;
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
