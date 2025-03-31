function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");

  chatBox.innerHTML += `<div class='user-msg'>You: ${userInput}</div>`;
  typingIndicator.style.display = "block";
  scrollToBottom();

  // ✅ POINT TO YOUR REPLIT BACKEND
  fetch("https://replit.com/@cansugborak/ai-interview-chatbot/get_answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      typingIndicator.style.display = "none";
      chatBox.innerHTML += `<div class='bot-msg'>Bot: ${data.answer}</div>`;
      scrollToBottom();
    })
    .catch((error) => {
      typingIndicator.style.display = "none";
      chatBox.innerHTML += `<div class='bot-msg'>Bot: Sorry, something went wrong.</div>`;
      scrollToBottom();
      console.error("Fetch error:", error);
    });

  document.getElementById("user-input").value = "";
}

function scrollToBottom() {
  const chatBox = document.getElementById("chat-box");
  chatBox.scrollTop = chatBox.scrollHeight;
}

