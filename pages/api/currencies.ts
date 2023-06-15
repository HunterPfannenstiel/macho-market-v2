import { NextApiHandler } from "next";
import { ServerError } from "custom-objects/ServerError";
import { parseUndefinedToNull, stringCheck } from "@_utils/server";
import { getCurrencies } from "@_utils/database/functions";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { activeFilter } = req.query;
      stringCheck(activeFilter);
      const currencies = await getCurrencies(
        parseUndefinedToNull(activeFilter)
      );
      return res.status(200).json(currencies);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res);
  }
};
export default handler;
