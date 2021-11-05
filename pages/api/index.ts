import type { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    example: "Hello World",
  });
};
