//*
//*--------------------------/routes/account------------------------------------

"use client";

import { useState, useMemo, useEffect } from "react";

import { useGlobalContext } from "@/app/Context";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { destType } from "@/app/helpers/types";

export default function Account() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [destItems, setDestItems] = useState<destType[]>([]);
  //*from Context.tsx file
  const { isWindow, setIsWindow } = useGlobalContext();

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUser(window.sessionStorage.getItem("currentUser") || null);
  }, []);

  function handleFormChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleNewAccount() {
    try {
      const res = await fetch("../../api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbPayload: formData,
          type: "createAccount",
        }),
      });

      if (!res.ok) throw new Error("Failed to Create New Account");
      setFormData({ username: "", password: "" });
      alert("Account Creation Successful");
    } catch (err) {
      alert(err);
    }
  }
  //*async currentTarget.submit doesn't work, unlike sync form submit from home page
  //*therefore, delay submit if wrong.
  async function handleFormSubmit(e: any) {
    e.preventDefault();
    try {
      // if (isWindow) {
      const res = await fetch("../../api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbPayload: formData,
          type: "login",
        }),
      });

      if (!res.ok) throw new Error("Failed to Login");

      const result = await res.json();

      // console.log(JSON.stringify(result, null, 2));

      if (result.user === null) {
        alert("Invalid Credentials");
      } else {
        setFormData({ username: "", password: "" });
        window.sessionStorage.setItem("currentUser", result.user.username);
        // setCurrentUser(result.user.username);
        router.push("/");
      }
      // }
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    async function initVars() {
      setDestItems([]);
      try {
        const userFromStorage =
          isWindow && window.sessionStorage.getItem("currentUser");
        if (userFromStorage) {
          const res = await fetch("../../api/trip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dbPayload: userFromStorage,
              type: "getAllList",
            }),
          });

          if (!res.ok) throw new Error("Failed to Init Variables");

          const { tripInfo } = await res.json();
          // console.log("tripInfo: " + JSON.stringify(tripInfo, null, 2));
          setDestItems(tripInfo);
          // tripInfo.map((trip: any) => {
          //   return setDestItems((prev) => [...prev, trip]);
          // });

          console.log("finished data transfer");
        }
      } catch (err) {
        alert(err);
      }
    }

    initVars();
  }, [isWindow]);

  return (
    <div
      id="account"
      className=" flex flex-row justify-center items-center  bg-gradient-to-r from-fuchsia-500 to-cyan-500"
    >
      <form
        className={`flex  py-8 rounded-xl border-2 mx-5 ${
          currentUser
            ? "flex-row justify-start w-full h-5/6 pl-8"
            : " flex-col justify-between items-center px-8"
        }`}
        action="../../"
        //prevent username and password from being shown as querystring
        method="POST"
        onSubmit={handleFormSubmit}
      >
        {currentUser ? (
          <div className="temp flex w-full h-full">
            <div className="basis-3/4 flex flex-col  justify-start items-center px-10 h-full">
              <h1 className="text-3xl">Trip List</h1>
              <section className="flex flex-col justify-start items-center overflow-y-auto w-full px-5 mt-5">
                {destItems.map((trip) => (
                  <aside
                    key={uuidv4()}
                    className="flex flex-row justify-between border-2 rounded-md p-5 my-3 text-xl w-full cursor-pointer "
                    onClick={() => {
                      router.push(`/r/tripId?tripId=${trip.tripId}`);
                    }}
                  >
                    <span>{trip.destName.split(",")[0].trim()}</span>
                    <span>
                      {trip.startDate} - {trip.endDate}
                    </span>
                  </aside>
                ))}
              </section>
            </div>
            <section className="basis-1/4 flex flex-row justify-around items-end">
              <h1 className=" border-b-2 h-14 text-center flex flex-col justify-center">
                Hello, {currentUser}
              </h1>
              <button
                type="button"
                title="Log Out"
                onClick={() => {
                  setCurrentUser(null);
                  window.sessionStorage.setItem("currentUser", "");
                }}
                // onClick={() => setC}
                className="bg-orange-500 h-14 w-28  m-0 rounded-lg"
              >
                Log Out
              </button>
            </section>
          </div>
        ) : (
          <div>
            <section className=" flex flex-col justify-around py-8 h-60 ">
              <label htmlFor="username">Username:</label>
              <input
                className="h-14  rounded-md pl-5 text-black my-2"
                type="accept"
                minLength={4}
                maxLength={10}
                required
                //
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                //
                pattern="[a-zA-Z0-9_]+"
                title="Invalid username. Please use only alphanumeric characters and underscore."
              />
              <label htmlFor="password">Password:</label>
              <input
                className="h-14  rounded-md pl-5 text-black my-2"
                type="password"
                minLength={4}
                maxLength={10}
                required
                //
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </section>
            <aside className="flex flex-row justify-between items-center h-2/6 ">
              {/* first button toggle account sign up(change background to signify) */}
              <button
                title="Create Account"
                type="button"
                className="bg-green-300 h-14 w-28 m-0 rounded-lg"
                onClick={handleNewAccount}
              >
                Create Account
              </button>
              {/* second button signs the user in after verifying credential with server */}

              <button
                title="Login"
                type="submit"
                className="bg-orange-500 h-14 w-28  m-0 rounded-lg"
              >
                Log in
              </button>
            </aside>
          </div>
        )}
      </form>
    </div>
  );
}
