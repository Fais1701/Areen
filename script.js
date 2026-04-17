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

  function isValidWish(text) {
    return text.length > 3 && /[a-zA-Z]/.test(text);
  }

  function addCard(text) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = text;
    cards.prepend(div);
  }

  // ✨ Typing effect
  function typeText(text) {
    feedback.innerText = "";
    feedback.style.opacity = "1";

    let i = 0;

    function typing() {
      if (i < text.length) {
        feedback.innerText += text.charAt(i);
        i++;
        setTimeout(typing, 20);
      }
    }

    typing();

    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 3000);
  }

  function generateResponse(wish, reason) {
    return `${wish}… the way you said "${reason}" — yeah, that felt real 💭`;
  }

  updateHint();

  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && input.value.trim() && wishesLeft > 0) {

      const value = input.value.trim();

      // ❌ Reject weak input
      if (!isValidWish(value)) {
        typeText("Come on… tell me something real 💭");
        input.value = "";
        return;
      }

      input.value = "";

      // STEP 1 → Wish
      if (step === 1) {
        currentWish = value;

        title.innerText = "Why does this matter to you?";
        input.placeholder = "Tell me why…";

        // slight pause (human feel)
        setTimeout(() => {
          typeText("Hmm… interesting.");
        }, 300);

        step = 2;
      }

      // STEP 2 → Reason
      else {
        const reason = value;

        addCard(currentWish);
        wishesLeft--;

        updateHint();

        // simulate thinking delay
        setTimeout(() => {
          typeText(generateResponse(currentWish, reason));
        }, 500);

        // Send to backend
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

        // Reset
        step = 1;
        input.placeholder = "Tell me something you want…";
        title.innerText = "Tell me another.";
        currentWish = "";

        if (wishesLeft === 0) {
          title.innerText = "I think I know exactly what to do now… ❤️";
          input.style.display = "none";

          setTimeout(() => {
            typeText("I’ll make sure your birthday feels exactly like you imagined 🎁");
          }, 1000);
        }
      }
    }
  });
});
