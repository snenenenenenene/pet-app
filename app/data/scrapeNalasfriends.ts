import { load } from "cheerio";
import { Pet } from "../constants/types";

export async function scrapeNalasFriends({
  type,
  random,
}: {
  type: string;
  random: number;
}) {
  async function getLink(link: string) {
    const linkResponse = await fetch(link);
    const linkHtmlString = await linkResponse.text();
    const $ = load(linkHtmlString);
    const description = $(".blog-inner-content-2").text();
    const images = $(".rslides")
      .find("img")
      .map((_i, img) => {
        return `https://www.nalasfriends.com${$(img).attr("src")}`.replace(
          "\n",
          ""
        );
      })
      .get();

    return { description: description, images: images };
  }

  let page = 1;
  let lastPageContent = "";
  const allData: any[] = [];

  while (page <= 4) {
    const response = await fetch(
      type === "cat"
        ? `https://www.nalasfriends.com/en/adopt?animal=1630&ccm_paging_p=${page}`
        : `https://www.nalasfriends.com/en/adopt?animal=1629&ccm_paging_p=${page}`
    );

    console.log(`Page: ${page}, Status: ${response.status}`);

    if (response.status === 404 || lastPageContent === response.url) {
      console.log(page);
      break;
    }

    const htmlString = await response.text();

    if (htmlString === lastPageContent) {
      console.log(page);
      break;
    }

    lastPageContent = htmlString;

    const $ = load(htmlString);
    const data: any[] = await Promise.all(
      $("div .blog-item")
        .map(async (_i, el) => {
          const name = $(el).find("h4 a").text();
          // const images = $(el)
          //   .find("img")
          //   .map((_i, img) => $(img).attr("src"))
          //   .get();

          const link = $(el).find("h4 a").attr("href");
          let linkData;

          if (link) {
            linkData = await getLink(link);
          }

          return {
            name,
            random: random,
            age: 0,
            sex: "Unknown",
            country: "Unknown",
            neutered: false,
            adopted: false,
            type: type,
            breed: "Unknown",
            organisation: "Nala's Friends",
            ...linkData,
          } as Pet;
        })
        .get()
    );

    allData.push(...data);
    page++;
  }

  return allData;
}

// https://ace-charity.org/en/zoek-kat/?this_page=1

export const scrapeAce = async ({
  type,
  random,
}: {
  type: string;
  random: number;
}) => {
  async function getLink(link: string) {
    const linkResponse = await fetch(link);
    const linkHtmlString = await linkResponse.text();
    const $ = load(linkHtmlString);
    console.log(link);
    const description = $("div .row")
      .find("[class='gt-block animal-description entry-summary']")
      .text();
    console.log(description);
    const list = $(
      "[class='list-group-item d-flex justify-content-between align-items-center']"
    );
    const images = $("ol")
      .find("li")
      .find("img")
      .map((_i, img) => {
        return `${$(img).attr("data-src")}`;
      })
      .get();

    const age = list.eq(1).find("span").eq(1).text();
    const breed = list
      .eq(2)
      .find("span")
      .eq(1)
      .map((_i, el) => $(el).text())
      .get();
    console.log(breed);

    const sex = list.eq(0).find("span").eq(1).text();

    return {
      description: description,
      breed: breed[0].toLowerCase(),
      age: age,
      sex: sex,
      images: images,
    };
  }

  let page = 1;
  let lastPageContent = "";
  const allData: any[] = [];

  while (page <= 20) {
    const response = await fetch(
      type === "cat"
        ? `https://ace-charity.org/en/zoek-kat/?this_page=${page}`
        : `https://ace-charity.org/en/zoek-hond/?this_page=${page}`
    );

    console.log(`Page: ${page}, Status: ${response.status}`);

    if (response.status === 404 || lastPageContent === response.url) {
      console.log(page);
      break;
    }

    const htmlString = await response.text();

    if (htmlString === lastPageContent) {
      console.log(page);
      break;
    }

    lastPageContent = htmlString;

    const $ = load(htmlString);
    const data: any[] = await Promise.all(
      $("div .card")
        .slice(0, 5)
        .map(async (_i, el) => {
          const name = $(el).find("div div div span a").text();
          // const images = $(el)
          //   .find("div img")
          //   .map((_i, img) => $(img).attr("data-src"))
          //   .get();

          const link = $(el).find("div a").attr("href");
          let linkData;

          if (link) {
            linkData = await getLink(`https://ace-charity.org${link}`);
          }

          return {
            name,
            age: 0,
            type: type,
            adopted: false,
            country: "Unknown",
            neutered: false,
            random: random,
            organisation: "Ace Charityy",
            ...linkData,
          } as Pet;
        })
        .get()
    );

    allData.push(...data);
    page++;
  }

  return allData;
};
