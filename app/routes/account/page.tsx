//*
//*--------------------------/routes/trip?destination=___ & date=______------------------------------------

"use client";

import { useState, useEffect } from "react";

export default function Account() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleFormChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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
          messages: "hello",
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch API");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div
      id="account"
      className=" flex flex-col justify-center items-center  bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900"
    >
      <form
        className="flex flex-col justify-between p-8 rounded-xl 0 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
        action=""
        //prevent username and password from being shown as querystring
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <section className=" flex flex-col justify-around py-8 h-60 ">
          <label htmlFor="username">Username:</label>
          <input
            className="h-14  rounded-md pl-5 text-black"
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
            className="h-14  rounded-md pl-5 text-black"
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
            type="button"
            className="bg-green-300 h-14 w-28 m-0 rounded-lg"
          >
            Create Account
          </button>
          {/* second button signs the user in after verifying credential with server */}

          <button
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
