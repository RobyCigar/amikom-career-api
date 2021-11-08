import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../utils/config";

const { BASEAPI } = config;

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    example: [{
      url: `${BASEAPI}/lowongan`,
      method: "GET",
      description: "Mendapatkan list lowongan pekerjaan",
    },
    {
      url: `${BASEAPI}/lowongan/:slug`,
      method: "GET",
      description: "Mendapatkan detail pekerjaan",
    },
    {
      url: `${BASEAPI}/perusahaan`,
      method: "GET",
      description: "Mendapatkan list perusahaan",
    },
    {
      url: `${BASEAPI}/perusahaan/:slug`,
      method: "GET",
      description: "Mendapatkan detail pekerjaan",
    }],
  
  });
};
