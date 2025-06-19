import "reflect-metadata"
import bootstrap from "./infrasrtucture/config/bootstrap";
import environment from "./infrasrtucture/config/environment";
import createServer from "./infrasrtucture/webserver/server";

const PORT = environment.PORT || 5001;

const start = async () => {
  try {
    await bootstrap.init();
    const app = await createServer();

    app.listen(PORT, () => {
      console.log("app running on port:", PORT);
    });
    
  } catch (error) {
    console.log("SERVER BOOTING HAVE ISSUE:", error);
    process.exit(1);
  }
};

start()