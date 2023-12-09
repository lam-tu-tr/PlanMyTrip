import { redirect } from "next/navigation";

import Image from "next/image";
import styles from "./account.module.scss";

import LocationCard from "@/components/LocationCard/LocationCard";
import SignOutButton from "@/components/Auth/SignOutButton";

import { BsCommand } from "react-icons/bs";

import { getServerSession } from "next-auth";

import FetchLocationList from "./hooks/FetchLocationList";

export default async function Account() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/routes/signin");
  }

  const destItems = await FetchLocationList();

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

            <SignOutButton />
          </section>

          <h1>Itineraries</h1>

          {destItems?.length == 0 ? (
            <section className={styles.empty}>
              <div>
                <BsCommand className="w-48 h-48" />
                <h2>View your generated itineraries here</h2>
              </div>
            </section>
          ) : (
            <ul className={`${styles["trip-list"]}`}>
              {destItems?.map((item: any, index: number) => {
                return <LocationCard key={index} cardItem={item} />;
              })}
            </ul>
          )}
        </section>
      </div>
    );
  }
  return <></>;
}
