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
