import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const router = express.Router();

router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000 * 5,
    },
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

let sessionData: any;
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "user1" || password !== "DummyPassword") {
    return res.status(403).send("ログイン失敗");
  }

  sessionData = req.session;
  sessionData.username = username;

  const token = crypto.randomUUID();
  res.cookie("csrf_token", token, { secure: true });

  res.redirect("/csrf_test.html");
});

router.post("/remit", (req: any, res) => {
  if (!req.session.username || req.session.username !== sessionData.username) {
    return res.status(401).send("見認証");
  }

  if (req.cookies["csrf_token"] !== req.body["csrf_token"]) {
    return res.status(400).send("不正なリクエストです");
  }

  const { to, amount } = req.body;
  return res.send(`「${to}」へ${amount}送信しました`);
});

export default router;
