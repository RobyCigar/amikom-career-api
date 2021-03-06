import { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import axios from "axios";
import config from "../../../utils/config";


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  let arrResult: any = [];
  let requirements: any = [];
  let about: any = [];
  let jurusan: string = "";
  let shit:any;

  const url = `${config.BASE}detail/lowongan/${slug}`;

  const getData = await axios.get(url).catch(function (error) {
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

  if (getData?.status === 404) {
    return res.status(404).json(getData);
  }

  const $ = cheerio.load(getData.data);

  const test = $('ul[class="company-info bullet-style"]');
  test.each((i, el) => {
    if (i == 0) {
      // get persyaratan
      $(el).each((j, el) => {
        // i'll refactor this crappy code later
        jurusan = $(el)
          .children()
          .first()
          .children()
          .first()
          .children()
          .first()
          .text()
          .replace(/\s\s+/g, " ");
        $(el)
          .children()
          .nextAll()
          .each((i, el) => {
            requirements.push($(el).text().replace(/\s\s+/g, ""));
          });
      });
    } else {
      // get company detail
      $(el).each((j, el) => {
        $(el)
          .text()
          .split("\n")
          .forEach((el) => {
            if (el.trim() !== "") {
              about.push(el.trim());
            }
          });
      });
    }
  });

  // get image banner
  const banner: string = $('div[class="banner-cover"]>img').attr("src");

  // get profile image
  const picture: string = $('div[class="thumb"]>img').attr("src");

  // get job role
  const jobRole: string = $('div[class="company-desc"]>h2')
    .text()
    .split("\n")[0];

  // get total vacancies
  const totalVacancies: string = $('div[class="total-vacancies"]').text();

  // get company description
  const companyDescription: string = $('div[class="company-desc"]>li').text();

  console.log("here", companyDescription);

  const result = {
    jobRole,
    banner,
    picture,
    jurusan,
    about,
    requirements,
  };
  return res
    .status(200)
    .json({ data: result, status: 200, message: "success" });
}
