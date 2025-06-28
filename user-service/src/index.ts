import "reflect-metadata"
import bootstrap from "./infrasrtucture/config/bootstrap";
import environment from "./infrasrtucture/config/environment";
import createServer from "./infrasrtucture/webserver/server";

const PORT = environment.PORT || 5001;

const start = async () => {
  try {
    await bootstrap.init();
    const app = await createServer();

    const server = app.listen(PORT, () => {
      console.log("")
      console.log("██╗   ██╗███████╗███████╗██████╗     ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗")
      console.log("██║   ██║██╔════╝██╔════╝██╔══██╗    ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝")
      console.log("██║   ██║███████╗█████╗  ██████╔╝    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ")
      console.log("██║   ██║╚════██║██╔══╝  ██╔══██╗    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ")
      console.log("╚██████╔╝███████║███████╗██║  ██║    ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗")
      console.log(" ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝")
      console.log("")
      console.log("🏃‍♂️ USER SERVICE IS RUNNING AND READY!")
      console.log(`⚡ Server active on Port:${PORT}`)
    })

    process.on('SIGTERM', () => {
      console.debug('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.debug('HTTP server closed');
      });
    });


  } catch (error) {
    console.log("SERVER BOOTING HAVE ISSUE:", error);
    process.exit(1);
  }
};

start()