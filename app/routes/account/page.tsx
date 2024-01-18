import { redirect } from "next/navigation";

import Image from "next/image";
import styles from "./account.module.scss";

import { TripCard } from "@/components/TripCard/TripCard";
import { SignOutButton } from "@/components/Auth/SignOutButton";

import { BsCommand } from "react-icons/bs";

import { ScrollArea } from "@/components/ui/scroll-area";

import { handleFetchLocationList } from "./helpers/handleFetchLocationList";

import { createSupabaseServerClient } from "@/supabase/createSupabaseServerClient";

export default async function Account() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/routes/signin");
  }

  const cardItineraryList = await handleFetchLocationList({
    user_id: user.id,
  });

  return (
    <div className="page-container">
      <section className={`${styles["account-body"]}`}>
        <section className={`${styles["user-profile"]}`}>
          <div>
            <Image
              src={user.user_metadata.avatar_url}
              width={50}
              height={50}
              alt="Profile Picture"
            />
          </div>

          <span>
            <h2>{user.user_metadata.name}</h2>
            <p>{user.user_metadata.email}</p>
          </span>

          <SignOutButton />
        </section>

        {cardItineraryList?.length == 0 ? (
          <section className={styles.empty}>
            <div>
              <BsCommand className="w-48 h-48" />
              <h2>View your saved itineraries here</h2>
            </div>
          </section>
        ) : (
          <ScrollArea>
            <ul className={`${styles["trip-list"]}`}>
              {cardItineraryList?.map((item: any, index: number) => {
                return <TripCard key={index} trip={item} />;
              })}
            </ul>
          </ScrollArea>
        )}
      </section>
    </div>
  );
}
