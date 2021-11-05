import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";

interface JobI {
  title: string;
  image: string;
  type: string;
  company: string;
  slug: string;
  requirements: string[];
  uploadedAt: string;
  validUntil: string;
  numOfViews: string;
  location: string;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  let { page } = req.query;
  let arrResult: JobI[] = [];
  let title: string[];
  let jobType: string[] | void[];
  let company: string[] | string;
  let slug: string[] | string;
  let requirements: string[] | string;
  let date: string[] | string;
  let url: string = `https://career.amikom.ac.id/telusuri/lowongan?page=${page}`;

  try {
    // PROD
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

    // get image url
    const imgUrl: any = $("div.thumb>img")
      .map((_i, x) => {
        return $(x).attr("src");
      })
      .toArray();

    // get the title of jobs
    title = $("h2").text().split("\n");
    title = title
      .filter((_el, i) => {
        return i % 2 ? true : false;
      })
      .map((el, _i) => {
        return el.trim();
      });
    title.forEach((el, i) => {
      arrResult[i] = {
        title: el,
        image: imgUrl[i],
        type: "",
        company: "",
        slug: "",
        requirements: [],
        uploadedAt: "",
        validUntil: "",
        numOfViews: "",
        location: "",
      };
    });

    // get the job types
    jobType = $(`div[class="badge badge-light"]`).text().split(" Waktu");
    jobType = jobType.filter((el) => (el ? el + "Waktu" : false));
    jobType.forEach((el, i) => {
      arrResult[i] = {
        ...arrResult[i],
        type: `${el} Waktu`,
      };
    });

    // get company name
    company = $(`a[class="company-name"]`).text();
    company = company.split("\n");
    company = company.map((el) => el.trim());
    company = company.filter((el) => (el ? el : false));
    company.forEach((el, i) => {
      arrResult[i] = {
        ...arrResult[i],
        company: el,
      };
    });

    // get slug
    slug = $(`a[class="detail-link"]`)
      .map((_i, x) => $(x).attr("href"))
      .toArray();
    slug = slug.map((el) => el.split("/")[5]);
    slug.forEach((el, i) => {
      arrResult[i] = {
        ...arrResult[i],
        slug: el,
        requirements: [],
      };
    });

    // get requirements like requirement, location, salary
    let currIndex: number = 0;
    let tmp: string;

    requirements = $(`ul[class=desc-list]`).text();
    requirements = requirements.split("\n");
    requirements = requirements.map((el) => el.trim());
    requirements = requirements.filter((el) => (el ? el : false));

    requirements.forEach((el, _i) => {
      if (el === "Masuk untuk melihat gaji") {
        currIndex++;
        return;
      }
      arrResult[currIndex].requirements.push(el);
    });

    arrResult.forEach((el, i) => {
      tmp = el.requirements.pop();
      arrResult[i] = { ...arrResult[i], location: tmp };
    });

    // get date
    date = $(`div[class=list-wrapper]`).text();
    date = date.split("\n");
    date = date.map((el) => el.trim());
    date = date.filter((el) => (el ? el : false));

    arrResult.forEach((_el, i) => {
      arrResult[i] = {
        ...arrResult[i],
        uploadedAt: date[i],
        validUntil: date[i + 1],
        numOfViews: date[i + 2],
      };
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
