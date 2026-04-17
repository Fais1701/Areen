document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBox");
  const cards = document.getElementById("cards");
  const feedback = document.getElementById("feedback");
  const title = document.getElementById("title");
  const hint = document.getElementById("hint");

  let wishesLeft = 3;

  // Update remaining wishes text
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

  // Add card to UI
  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  // Show feedback message
  function showFeedback(text) {
    feedback.innerText = text;
    feedback.style.opacity = "1";

    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 2000);
  }

  // 🔥 Smart personalized responses
  function generateCuteResponse(wish) {
    const w = wish.toLowerCase();

    if (w.includes("watch")) {
      return "A watch… I can already picture you checking the time just to smile thinking of me ⌚💫";
    }

    if (w.includes("phone")) {
      return "A new phone? I guess I’ll have to make sure I’m your favorite notification 📱❤️";
    }

    if (w.includes("dress")) {
      return "A dress… yeah, I already know you’d look unreal in it ✨";
    }

    if (w.includes("shoes")) {
      return "Shoes? Looks like someone’s planning to walk straight into my attention 👀";
    }

    if (w.includes("food") || w.includes("pizza") || w.includes("burger")) {
      return "Food? I’m not letting you have that alone… I’m joining you 🍕❤️";
    }

    if (w.includes("trip") || w.includes("travel")) {
      return "A trip… that sounds less like a plan and more like a memory waiting to happen ✈️";
    }

    if (w.includes("perfume")) {
      return "Perfume… dangerous. I won’t survive if you smell that good 💫";
    }

    if (w.includes("bag")) {
      return "A bag… so you can carry everything except how much I like you 🖤";
    }

    if (w.includes("you") || w.includes("me")) {
      return "You already have more of me than you realise ❤️";
    }

    // fallback (still personalized)
    return `${wish}… yeah, that’s not random. I’m remembering this one 💭`;
  }

  // Handle input
  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim() && wishesLeft > 0) {

      const wish = input.value.trim();
      input.value = "";

      addCard(wish);

      wishesLeft--;

      showFeedback(generateCuteResponse(wish));

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

      // Final state
      if (wishesLeft === 0) {
        title.innerText = "I
