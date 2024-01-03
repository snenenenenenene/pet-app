export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
    }).then((res) => res.json());
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
