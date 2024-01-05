export async function fetchGetJSON(url: string) {
  try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      console.log(res);
      return res.json();
    });
    return data;
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err.message);
  }
}
