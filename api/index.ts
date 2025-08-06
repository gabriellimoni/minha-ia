// import ollama from "ollama";
import express, { json, type Request, type Response } from "express";

// const response = await ollama.chat({
//   model: "gemma3:1b",
//   messages: [{ role: "user", content: "Why is the sky blue?" }],
// });
// console.log(response.message.content);

const app = express();
app.use(json());

app.post("/generate-commit-message", (req: Request, res: Response) => {
  res.status(200).send(req.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on", port);
});
