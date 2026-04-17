document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputBox");
  const cards = document.getElementById("cards");
  const feedback = document.getElementById("feedback");
  const title = document.getElementById("title");
  const hint = document.getElementById("hint");

  let wishesLeft = 3;

  const cuteResponses = [
    "That sounds like something you truly deserve… 💫",
    "I can already imagine you smiling when this happens… 💖",
    "Noted… this one feels special. 🌙"
  ];

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

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() && wishesLeft > 0) {

      const wish = input.value.trim();
      input.value = "";

      addCard(wish);

      wishesLeft--;

      // Show cute message
      showFeedback(cuteResponses[2 - wishesLeft]);

      // Update hint
      if (wishesLeft > 1) {
        hint.innerText = `${wishesLeft} wishes remaining`;
      } else if (wishesLeft === 1) {
        hint.innerText = "1 wish remaining… choose wisely";
      } else {
        hint.innerText = "";
      }

      // Final state
      if (wishesLeft === 0) {
        title.innerText = "We’ve received your wishes… ❤️";
        input.style.display = "none";

        setTimeout(() => {
          showFeedback("We’ll surprise you on your birthday with something your heart truly craves. 🎁");
        }, 1000);
      }
    }
  });
});
