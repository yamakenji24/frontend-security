import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  const message = req.query.message;
  const lang = req.headers["x-lang"];

  if (message === "") {
    switch(lang) {
      case 'en':
        return res.status(400).send({ message: "message is empty" });
      default:
        return res.status(400).send({ message: "messageの値が空です。" });
    }
  }
  res.status(200).send({ message });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  res.end();
});

export default router;
