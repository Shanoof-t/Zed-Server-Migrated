import { connectDB } from "../database/db";

async function init() {
  await connectDB();
}

export default { init };
