function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const typingIndicator = document.getElementById("typing-indicator");

  chatBox.innerHTML += `<div class='user-msg'>You: ${userInput}</div>`;
  typingIndicator.style.display = "block";
  scrollToBottom();

  // ✅ Your working Replit backend URL
  fetch("https://20fb0956-1a6f-4b18-93f2-7ecfab4ded5a-00-tpielkxyl6os.picard.replit.dev/get_answer", {
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
