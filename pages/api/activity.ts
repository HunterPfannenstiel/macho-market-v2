import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import {
  optionalStringCheck,
  parseUndefinedToNull,
  stringCheck,
} from "@_utils/server";
import { viewActivity } from "@_utils/database/functions";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { date, page, pageSize, user, listingId, tokenId } = req.query;
      stringCheck(date, page, pageSize);
      optionalStringCheck(user, listingId, tokenId);
      const activity = await viewActivity(
        date as string,
        +(page as string),
        +(pageSize as string),
        parseUndefinedToNull(user),
        parseUndefinedToNull(listingId),
        parseUndefinedToNull(tokenId)
      );
      return res.status(200).json(activity);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
