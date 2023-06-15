import { userQuery } from "@_utils/database/connect";
import { ServerError } from "custom-objects/ServerError";
import { NextApiHandler } from "next";
const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      //Should throw error, not allowed to insert values
      const query = "INSERT INTO market.contract_type(type) VALUES ('INVALID')";
      await userQuery(query);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }
  } catch (error: any) {
    ServerError.sendErrorResponse(error, res, true);
  }
};
export default handler;
