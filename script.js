document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBox");
  const cards = document.getElementById("cards");
  const feedback = document.getElementById("feedback");
  const title = document.getElementById("title");

  let step = 1;
  let tempWish = "";

  // Load saved wishes
  const saved = JSON.parse(localStorage.getItem("wishes")) || [];
  saved.forEach(addCard);

  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  // Subtle UI feedback
  input.addEventListener("focus", () => {
    title.style.opacity = "0.6";
  });

  input.addEventListener("blur", () => {
    title.style.opacity = "1";
  });

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim()) {

      const value = input.value.trim();

      if (step === 1) {
        tempWish = value;
        title.innerText = "Why does that matter to you?";
        input.value = "";
        step = 2;

      } else {
        const reason = value;

        // Save locally
        const stored = JSON.parse(localStorage.getItem("wishes")) || [];
        stored.push(tempWish);
        localStorage.setItem("wishes", JSON.stringify(stored));

        addCard(tempWish);

        // Send to Formspree
        fetch("https://formspree.io/f/xykbwayy", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(Object.assign(document.createElement("form"), {
            innerHTML: `
              <input name="wish" value="${tempWish}">
              <input name="reason" value="${reason}">
            `
          }))
        });

        // Feedback
        feedback.style.opacity = "1";
        setTimeout(() => feedback.style.opacity = "0", 1500);

        // Reset loop
        input.value = "";
        title.innerText = "Tell me another.";
        step = 1;
      }
    }
  });
});
