import express from "express";
import https from "https";
import fs from "fs";
import api from "./routes/api";

const app = express();
const PORT = 80;

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.hostname}`);
  }
})

app.use(express.static("public", {
  setHeaders: (res, path, stat) => {
    res.header("X-Frame-Options", "SAMEORIGIN");
    res.header("Strict-Transport-Security", "max-age=60");
  }
}));
app.use("/api", api);

app.get("/", (req, res, next) => {
  res.end("Top Page");
});

app.listen(PORT, () => {
  console.log(`Server is running or port ${PORT}`);
});

const HTTPSPORT = 443;
https
  .createServer(
    {
      key: fs.readFileSync("./cert/localhost+1-key.pem"),
      cert: fs.readFileSync("./cert/localhost+1.pem"),
    },
    app
  )
  .listen(HTTPSPORT, function () {
    console.log(`Server is running on https://localhost:${HTTPSPORT}`);
  });
