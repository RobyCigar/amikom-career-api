import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import config  from "../../../utils/config";
import cheerio from "cheerio";

interface JobI {
  title: string;
  image: string;
  type: string;
  jumlahLowongan: number[];
  company: string;
  field: string;
  slug: string;
  description: any;
  requirements: string[];
  uploadedAt: string;
  validUntil: string;
  numOfViews: string;
  location: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { BASE } = config;
  let { page } = req.query;
  let arrResult: JobI[] = [];
  let imgUrl: string[] = [];
  let title: string[];
  let field: string[];
  let jobType: string[] | void[];
  let company: string[] | string;
  let jumlahLowongan: number[] = [];
  let companyName: any = [];
  let companyStatus: string[] = [];
  let description: string[] = [];
  let slug: string[] = [];
  let requirements: string[] | string;
  let date: string[] | string;
  let url: string = `${BASE}/perusahaan?page=${page}`;

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

    // get company name and slug
    let test = $("div.company-desc>a").each(function (
      index: number,
      element: any
    ) {
      slug.push($(this).attr("href"));
      companyName.push($(this).text().replace(/\s\s+/gm, ""));
    });
    
    // get company status
    $("div[class=\"badge badge-light\"]").each(function (
      index: number,
      element: any
    ) {
      jumlahLowongan.push(parseInt($(this).next().find("h2").text()));
      companyStatus.push($(this).text().replace(/\s\s+/gm, ""));
    });


    description = $("div.company-profile").find("p").map(function (
      index: number,
      element: any
    ) {
      return $(this).text().replace(/\s\s+/gm, " ");
    }).toArray();
    
    arrResult = {
      description,
      jumlahLowongan,
      slug,
      companyName,
      companyStatus,
    };

    if (arrResult.length === 0) {
      res.status(404).json({ error: "No data found!" });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "success", data: arrResult });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
}
