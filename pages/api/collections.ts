import { viewCollections } from "@_utils/database/functions";
import { stringCheck } from "@_utils/server";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { date, page, pageSize } = req.query;
      stringCheck(date, page, pageSize);
      const collections = await viewCollections(
        date as string,
        +(page as string),
        +(pageSize as string)
      );
      return res.status(200).json(collections);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error) {
    ServerError.sendErrorResponse(error, res, true);
  }
};
export default handler;
