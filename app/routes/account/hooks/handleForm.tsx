//*async currentTarget.submit doesn't work, unlike sync form submit from home page
//*therefore, delay submit if wrong.
function handleFormChange(e: any) {
  setFormData({ ...formData, [e.target.name]: e.target.value });
}
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

export { handleFormChange, handleFormSubmit };
