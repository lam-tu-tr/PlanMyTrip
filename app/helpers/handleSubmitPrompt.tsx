//this function processes directory
export async function handleSubmitPrompt(form: {
  tripLocation: string;
  tripDate: string;
}) {
  console.log("hi");
  console.log("location: " + form.tripLocation + " date: " + form.tripDate);
  try {
    // const res = await fetch("/api/prompt", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: "Recommend 2 places to checkout on my trip to LA",
    //   }),
    // });
    // if (!res.ok) {
    //   throw new Error("Failed to fetch API");
    // }
    // const data = await res.json();
    // console.log("data: " + data.aiResultText);
    // console.log("tripOptions: \n" + JSON.stringify(data.tripOptions));
  } catch (err) {
    console.log(err);
  }
}
