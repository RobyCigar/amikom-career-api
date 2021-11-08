import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import config from "../../../utils/config";
import cheerio from "cheerio";

interface JobI {
  image: string;
  type: string;
  jumlahLowongan: number;
  companyName: any;
  companyStatus: any;
  field: string;
  slug: string;
  description: any;
  location: string;
  website: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { BASE } = config;
  let { page } = req.query;
  let arrResult: JobI[] = [];
  let companyName: any = [];
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
    $("div.company-desc>a").each(function (index: number, element: any) {
      arrResult[index] = {
        image: "",
        type: "",
        jumlahLowongan: 0,
        companyName: $(this).text().replace(/\s\s+/gm, ""),
        companyStatus: "",
        field: "",
        description: "",
        location: "",
        website: "",
        slug: $(this).attr("href").split("/")[4],
      };
    });

    // get image
    $("div.thumb>img").each((index, element) => {
      arrResult[index] = {
        ...arrResult[index],
        image: $(element).attr("src"),
      };
    });

    // get company status
    $('div[class="badge badge-light"]').each(function (
      index: number,
      element: any
    ) {
      arrResult[index] = {
        ...arrResult[index],
        jumlahLowongan: parseInt($(this).next().find("h2").text()),
        companyStatus: $(this).text().trim(),
      };
    });

    // get description
    $("div.company-profile")
      .find("p")
      .map(function (index: number, element: any) {
        arrResult[index] = {
          ...arrResult[index],
          description: $(this).text().trim(),
        };
      });

    let tmp: string;
    // get desc list
    $("ul.desc-list").each((i, element) => {
      $(element)
        .children()
        .each((j, el) => {
          tmp = $(el).last().text().trim();
          if (j === 0) {
            arrResult[i] = {
              ...arrResult[i],
              field: tmp,
            };
          } else if (j === 1) {
            arrResult[i] = {
              ...arrResult[i],
              location: tmp,
            };
          } else if (j === 2) {
            arrResult[i] = {
              ...arrResult[i],
              website: tmp,
            };
          }
        });
    });

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
