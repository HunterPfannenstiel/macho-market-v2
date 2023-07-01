import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      return res.redirect("/machoverse/login");
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
