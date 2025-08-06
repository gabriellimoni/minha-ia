import ollama from "ollama";

const response = await ollama.chat({
  model: "gemma3:1b",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
});
console.log(response.message.content);
