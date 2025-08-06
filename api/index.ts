import ollama from "ollama";
import express, { json, type Request, type Response } from "express";

const app = express();
app.use(json());

app.post("/generate-commit-message", async (req: Request, res: Response) => {
  if (!req.body.diff) return res.status(400).send({ message: "diff not sent" });

  const response = await ollama.chat({
    model: "gemma3:1b",
    messages: [
      {
        role: "system",
        content:
          "You are a very experienced developer and needs to generate one commit message with the following GIT diff content",
      },
      {
        role: "system",
        content: "Be very specific about the change that is being made",
      },
      {
        role: "system",
        content: "Always use prefix from the conventional commits guidelines",
      },
      {
        role: "system",
        content:
          "Return only the commit message, without any further explanation",
      },
      {
        role: "user",
        content: `Here are the diff content:\n\n${req.body.diff}`,
      },
    ],
  });
  console.log(response);
  res.status(200).send(response.message.content);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on", port);
});
