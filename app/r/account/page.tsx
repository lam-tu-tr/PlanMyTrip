//*
//*--------------------------/routes/account------------------------------------

"use client";

import { useState } from "react";

import { useGlobalContext } from "@/app/Context";

import { useRouter } from "next/navigation";

export default function Account() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //*from Context.tsx file
  const { currUsername, setCurrUsername } = useGlobalContext();

  const router = useRouter();

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
      console.log("handleFormSubmit");
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

      console.log(JSON.stringify(result, null, 2));

      if (result.user === null) {
        alert("Invalid Credentials");
      } else {
        setFormData({ username: "", password: "" });
        window.sessionStorage.setItem("currentUser", result.user.username);
        router.push("/");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div
      id="account"
      className=" flex flex-col justify-center items-center  bg-gradient-to-r from-fuchsia-500 to-cyan-500"
    >
      <form
        className="flex flex-col justify-between p-8 rounded-xl 0 border-2"
        action="../../"
        //prevent username and password from being shown as querystring
        method="POST"
        onSubmit={handleFormSubmit}
      >
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
      </form>
    </div>
  );
}
