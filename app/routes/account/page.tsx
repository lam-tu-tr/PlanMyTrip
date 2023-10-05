//*
//*--------------------------/routes/account------------------------------------

"use client";

import { useState, useEffect } from "react";

import { useGlobalContext } from "@/app/Context";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { destType } from "@/app/helpers/types";
import { toastError } from "@/app/helpers/toast";

export default function Account() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [destItems, setDestItems] = useState<destType[]>([]);

  const { isWindow, setIsWindow } = useGlobalContext();

  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [createAccount, setCreateAccount] = useState(false);

  const router = useRouter();

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
      toastError("Account Creation Successful");
      setCreateAccount(false);
    } catch (err) {
      toastError("Couldnt Create Account");
    }
  }
  //*async currentTarget.submit doesn't work, unlike sync form submit from home page
  //*therefore, delay submit if wrong.
  async function handleFormSubmit(e: any) {
    e.preventDefault();

    if (formData.username !== "Account123") {
      toastError("Please use the provided account info");
      return;
    }
    try {
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

      if (result.user === null) {
        toastError("Invalid Credentials");
      } else {
        setFormData({ username: "", password: "" });
        window.sessionStorage.setItem("currentUser", result.user.username);
        setCurrentUser(result.user.username);
      }
    } catch (err) {
      toastError("Couldnt log in");
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
          setDestItems(tripInfo);

          console.log("finished data transfer");
        }
      } catch (err) {
        toastError("Couldnt transfer data to server");
      }
    }

    initVars();
  }, [isWindow, currentUser]);

  return (
    <div
      id="account"
      className=" flex flex-row justify-center items-center  bg-gradient-to-r from-fuchsia-500 to-cyan-500"
    >
      <form
        className={`flex  py-8 rounded-xl border-2 mx-5 ${
          currentUser
            ? "flex-row justify-start w-full h-5/6 "
            : " flex-col justify-between items-center px-8"
        }`}
        action="../../"
        //prevent username and password from being shown as querystring
        method="POST"
        onSubmit={handleFormSubmit}
      >
        {/* Display list of trips if there is a user logged in */}
        {currentUser ? (
          <div className="tripList w-full h-full">
            <div className="trips px-1 h-9">
              <h1 className="text-3xl">Trip List</h1>
              <section className="flex flex-col justify-start items-center overflow-y-auto w-full px-5 h-full">
                {destItems.map((trip) => (
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
                ))}
              </section>
            </div>
            <section className="tripControl flex flex-row justify-around items-end ">
              <h1 className=" border-b-2 h-14 text-center flex flex-col justify-center mr-3">
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
              </button>
            </section>
          </div>
        ) : (
          // display log in screen if no user logged in
          <div>
            <section className=" flex flex-col justify-around py-8 h-60 ">
              <label htmlFor="username">Username:</label>
              <input
                className="h-14  rounded-md pl-5 text-black my-2"
                type="accept"
                minLength={4}
                maxLength={10}
                required
                name="username"
                value={formData.username}
                onChange={handleFormChange}
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
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </section>
            <aside className="flex flex-col justify-center items-center h-2/6 ">
              {createAccount ? (
                <button
                  title="Create Account"
                  type="button"
                  className="bg-green-300 h-14 w-28 m-0 rounded-lg"
                  onClick={handleNewAccount}
                >
                  Create Account
                </button>
              ) : (
                <button
                  title="Login"
                  type="submit"
                  className="bg-orange-500 h-14 w-28  m-0 rounded-lg"
                >
                  Log in
                </button>
              )}
            </aside>
            <p className="m-5">
              Login using <br /> Username: Account123 <br /> Password: Pass123
            </p>
            {/* <span
              id="signUp"
              className={` flex flex-row justify-end mt-5`}
              onClick={() => setCreateAccount((prev) => !prev)}
            >
              {createAccount ? "Log In" : "Sign Up"}
            </span> */}
          </div>
        )}
      </form>
    </div>
  );
}
