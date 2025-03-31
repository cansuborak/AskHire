function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");

  // Show user's message
  chatBox.innerHTML += `<div class='user-msg'>You: ${userInput}</div>`;
  typingIndicator.style.display = "block";
  scrollToBottom();

  // ✅ Corrected fetch URL to include /get_answer
  fetch("https://cebc5f12-ae91-4da9-9f19-bca7e20bdb6d-00-22ep397s4apra.picard.replit.dev/get_answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  })
    .then(response => response.json())
    .then(data => {
      typingIndicator.style.display = "none";
      chatBox.innerHTML += `<div class='bot-msg'>Bot: ${data.answer}</div>`;
      scrollToBottom();
    })
    .catch(error => {
      typingIndicator.style.display = "none";
      chatBox.innerHTML += `<div class='bot-msg'>Bot: Sorry, something went wrong.</div>`;
      console.error("Fetch error:", error);
      scrollToBottom();
    });

  document.getElementById("user-input").value = "";
}
