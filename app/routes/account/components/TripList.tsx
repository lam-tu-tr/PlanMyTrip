export default function TripList() {
  return (
    <div className="tripList w-full h-full">
      <div className="trips px-1 h-9">
        <h1 className="text-3xl">Trip List</h1>
        <section className="flex flex-col justify-start items-center overflow-y-auto w-full px-5 h-full">
          {/* {destItems.map((trip) => (
            <aside
              key={uuidv4()}
              className="flex flex-col justify-between border-2 rounded-md p-5 my-3 text-xl w-full cursor-pointer "
              onClick={() => {
                router.push(`/routes/tripId?tripId=${trip.tripId}`);
              }}
            >
              <span className="tripName text-md">
                {trip.destName.split(",")[0].trim()}
              </span>
              <span className="tripDate flex flex-row justify-end text-sm">
                <span className="pr-2">{trip.startDate}</span>-
                <span className="pl-2">{trip.endDate}</span>
              </span>
            </aside>
          ))} */}
        </section>
      </div>
      <section className="tripControl flex flex-row justify-around items-end ">
        {/* <h1 className=" border-b-2 h-14 text-center flex flex-col justify-center mr-3">
          Hello, {currentUser}
        </h1>
        <button
          type="button"
          title="Log Out"
          onClick={() => {
            setCurrentUser(null);
            window.sessionStorage.setItem("currentUser", "");
          }}
          className="bg-orange-500 h-14 w-28  m-0 rounded-lg"
        >
          Log Out
        </button> */}
      </section>
    </div>
  );
}
