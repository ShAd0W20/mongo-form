import app from "./app";
import config from "./config/config";
import connect from "./config/db";

const port = config.BASE_PORT;

app.listen(port, async () => {
  await connect();
  console.log(`Server running on port ${port}`);
});
