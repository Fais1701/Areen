document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBox");
  const cards = document.getElementById("cards");
  const title = document.getElementById("title");
  const hint = document.getElementById("hint");
  const feedback = document.getElementById("inlineFeedback");

  let wishesLeft = 3;
  let step = 1;
  let currentWish = "";

  function updateHint() {
    if (wishesLeft > 1) {
      hint.innerText = `${wishesLeft} wishes remaining`;
    } else if (wishesLeft === 1) {
      hint.innerText = "1 wish remaining… choose wisely";
    } else {
      hint.innerText = "";
    }
  }

  updateHint();

  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  function showFeedback(text) {
    feedback.innerText = text;
    feedback.style.opacity = "1";

    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 2200);
  }

  function generateResponse(wish, reason) {
    return `${wish}… the way you said "${reason}" — yeah, I’m definitely not forgetting this one 💭`;
  }

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim() && wishesLeft > 0) {

      const value = input.value.trim();
      input.value = "";

      // STEP 1 → capture wish
      if (step === 1) {
        currentWish = value;
        title.innerText = "Why does this matter to you?";
        input.placeholder = "Tell me why…";
        step = 2;
      }

      // STEP 2 → capture reason
      else {
        const reason = value;

        addCard(currentWish);

        wishesLeft--;

        showFeedback(generateResponse(currentWish, reason));

        updateHint();

        // Send to Formspree
        fetch("https://formspree.io/f/xykbwayy", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(Object.assign(document.createElement("form"), {
            innerHTML: `
              <input name="wish" value="${currentWish}">
              <input name="reason" value="${reason}">
            `
          }))
        });

        // Reset flow
        step = 1;
        input.placeholder = "Tell me something you want…";
        title.innerText = "Tell me another.";
        currentWish = "";

        if (wishesLeft === 0) {
          title.innerText = "I think I know exactly what to do now… ❤️";
          input.style.display = "none";

          setTimeout(() => {
            showFeedback("We’ll surprise you on your birthday with something your heart truly craves 🎁");
          }, 1000);
        }
      }
    }
  });
});
