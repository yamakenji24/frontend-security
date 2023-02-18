import express from 'express';

const app = express();
const PORT = 10000;

app.get("/", (req, res, next) => {
  res.end("Top Page");
})

app.listen(PORT, () => {
  console.log(`Server is running or port ${PORT}`)
})