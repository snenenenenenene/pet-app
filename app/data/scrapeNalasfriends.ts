import { load } from "cheerio";

export async function scrapeNalasFriends() {
  async function getLink(link: string) {
    const linkResponse = await fetch(link);
    const linkHtmlString = await linkResponse.text();
    const $ = load(linkHtmlString);
    const description = $(".blog-inner-content-2").text();
    return { description: description };
  }

  let page = 1;
  let lastPageContent = "";
  const allData: any[] = []; // Array to collect data from each page

  while (page <= 4) {
    const response = await fetch(
      `https://www.nalasfriends.com/en/adopt?ccm_paging_p=${page}`
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
          const images = $(el)
            .find("img")
            .map((_i, img) => $(img).attr("src"))
            .get();

          const link = $(el).find("h4 a").attr("href");
          let linkData;

          if (link) {
            linkData = await getLink(link);
          }

          return {
            name,
            age: 0,
            type: "Unknown",
            breed: "Unknown",
            organisation: "Nala's Friends",
            images: images.map(
              (image) => "https://www.nalasfriends.com" + image
            ),
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
