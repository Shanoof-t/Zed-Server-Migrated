import "reflect-metadata";
import environment from "./infrastructure/configs/environment";
import bootstrap from "./infrastructure/configs/bootstrap";

const PORT = environment.SERVER_PORT || 5005;

const startServer = async () => {
  const server = await bootstrap.init();

  server.listen(PORT, () => {
    console.log("");
    console.log("███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗     ██████╗  █████╗ ████████╗███████╗██╗    ██╗ █████╗ ██╗   ██╗")
    console.log("██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝    ██╔════╝ ██╔══██╗╚══██╔══╝██╔════╝██║    ██║██╔══██╗╚██╗ ██╔╝")
    console.log("███████╗██║   ██║██║     █████╔╝ █████╗     ██║       ██║  ███╗███████║   ██║   █████╗  ██║ █╗ ██║███████║ ╚████╔╝ ")
    console.log("╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║       ██║   ██║██╔══██║   ██║   ██╔══╝  ██║███╗██║██╔══██║  ╚██╔╝  ")
    console.log("███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║       ╚██████╔╝██║  ██║   ██║   ███████╗╚███╔███╔╝██║  ██║   ██║   ")
    console.log("╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ")
    console.log("");
    console.log("🏃‍♂️ ZED IS RUNNING AND READY!");
    console.log(`⚡ Server active on http://localhost:${PORT}`);
  });
};
startServer();
