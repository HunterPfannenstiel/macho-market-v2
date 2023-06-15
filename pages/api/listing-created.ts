import Moralis from "moralis";
import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const signature = req.headers["x-signature"];
      if (typeof signature !== "string") {
        throw new ServerError("No signature provided", 400);
      }

      await Moralis.start({ apiKey: process.env.MORALIS_PRIVATE_KEY });
      Moralis.Streams.verifySignature({
        body: req.body,
        signature,
      });
      const { logs } = req.body;
      console.log(logs);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
