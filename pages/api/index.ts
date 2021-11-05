import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json({
      message: "Hi, selamat datang di gerbang pintu API, silakan klik url dibawah untuk mencoba APInya",
      createdBy: "https://www.github.com/Robycigar",
    });
  } else {
    res.status(405).end();
  }
}