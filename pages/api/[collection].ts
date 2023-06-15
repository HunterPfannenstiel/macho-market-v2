import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { parseUndefinedToNull, stringCheck } from "@_utils/server";
import { viewCollectionListings } from "@_utils/database/functions";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { title, date, page, pageSize, currencyId } = req.query;
      stringCheck(title, date, page, pageSize, currencyId);

      const listings = await viewCollectionListings(
        title as string,
        date as string,
        +(page as string),
        +(pageSize as string),
        parseUndefinedToNull(currencyId)
      );
      return res.status(200).json(listings);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
