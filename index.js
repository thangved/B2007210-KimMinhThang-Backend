require("module-alias/register");
const server = require("./server");

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`);
  });
};

startServer();
