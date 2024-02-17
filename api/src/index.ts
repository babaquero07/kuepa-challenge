import app from "./app";

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on("error", console.error);
