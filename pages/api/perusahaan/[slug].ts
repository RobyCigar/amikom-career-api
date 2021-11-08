import type { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import config from "../../../utils/config";
import axios, { AxiosResponse } from "axios";

interface CompanyI {
  banner: string;
  picture: string;
  companyInfo: string | string[];
  jobAvailable: string[];
  title: string;
  description: string;
  contact: string[];
  slug: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { BASE } = config;
  const { slug }: any = req.query;
  let arrResult: CompanyI;
  let title: string = "";
  let banner: string = "";
  let picture: string = "";
  let jobAvailable: string | string[] = [];
  let description: string | string[] = [];
  let companyInfo: string[] = [];
  let contact: string[] = [];
  let url: string = `${BASE}/perusahaan/${slug}`;
  try {
    const getData: any = await axios
      .get<AxiosResponse>(url)
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          return {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          };
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    const $ = cheerio.load(getData.data);

    banner = $("div.banner-cover>img").attr("src");
    title = $('div[class="company-desc"]>h2').text();
    picture = $("div.vrt-job-cmp-logo > img").attr("src");

    description = $("div.detail-info>div.company-profile>p").text().trim();

    companyInfo = $("ul.company-info>li>p")
      .toArray()
      .map((el) => $(el).text());

    arrResult = {
      banner,
      picture,
      title,
      description,
      companyInfo,
      jobAvailable,
      contact,
      slug,
    };

    res.status(200).json({ msg: "success", status: 200, data: arrResult });
  } catch (error) {
    console.log(error);
  }
};
