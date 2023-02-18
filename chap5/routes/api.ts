import express, { raw } from "express";

const router = express.Router();

const allowList = [
  "https://localhost",
  "https://site.example"
]
router.use((req, res, next) => {
  if (req.headers.origin && allowList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "X-Token");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());
  const message = req.query.message;
  const lang = req.headers["x-lang"];

  if (message === "") {
    switch (lang) {
      case "en":
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
