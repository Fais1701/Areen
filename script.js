document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBox");
  const cards = document.getElementById("cards");
  const feedback = document.getElementById("feedback");
  const title = document.getElementById("title");
  const hint = document.getElementById("hint");

  let wishesLeft = 3;

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
    }, 2000);
  }

  function generateCuteResponse(wish, index) {
    const w = wish.toLowerCase();

    if (w.includes("food") || w.includes("pizza") || w.includes("burger")) {
      return "Noted… I can already picture us enjoying that together 🍽️";
    }

    if (w.includes("trip") || w.includes("travel")) {
      return "That sounds like a memory waiting to happen ✈️";
    }

    if (w.includes("dress") || w.includes("outfit")) {
      return "You’d look unreal in that… not even kidding 💫";
    }

    if (w.includes("love") || w.includes("you")) {
      return "You already have more of me than you realise ❤️";
    }

    const generic = [
      "That one feels important… I’m remembering it 💭",
      "You didn’t just say that randomly… I can tell 💖",
      "Okay… this one stays with me 🌙"
    ];

    return generic[index % generic.length];
  }

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim() && wishesLeft > 0) {

      const wish = input.value.trim();
      input.value = "";

      addCard(wish);

      wishesLeft--;

      showFeedback(generateCuteResponse(wish, 3 - wishesLeft));

      updateHint();

      // Send to Formspree
      fetch("https://formspree.io/f/xykbwayy", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(Object.assign(document.createElement("form"), {
          innerHTML: `
            <input name="wish" value="${wish}">
          `
        }))
      });

      if (wishesLeft === 0) {
        title.innerText = "I think I know exactly what to do now… ❤️";
        input.style.display = "none";

        setTimeout(() => {
          showFeedback("We’ll surprise you on your birthday with something your heart truly craves 🎁");
        }, 1000);
      }
    }
  });
});
